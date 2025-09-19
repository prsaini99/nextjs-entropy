import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyAuth } from '@/lib/auth-check';

export async function GET(request) {
  try {
    // Verify authentication
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized', message: auth.error },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const status = searchParams.get('status');
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');
    const search = searchParams.get('search');
    const sort_by = searchParams.get('sort_by') || 'created_at';
    const sort_order = searchParams.get('sort_order') || 'desc';

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build query using admin client to bypass RLS
    let query = supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order(sort_by, { ascending: sort_order === 'asc' });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }
    
    if (utm_source) {
      query = query.eq('utm_source', utm_source);
    }
    
    if (utm_medium) {
      query = query.eq('utm_medium', utm_medium);
    }
    
    if (utm_campaign) {
      query = query.eq('utm_campaign', utm_campaign);
    }
    
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,work_email.ilike.%${search}%,service.ilike.%${search}%`);
    }

    const { data: leads, error, count } = await query;

    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total: count,
        total_pages: Math.ceil(count / limit),
        has_next: to < count - 1,
        has_prev: page > 1,
      },
    });

  } catch (error) {
    console.error('Error in leads API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    // Verify authentication
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized', message: auth.error },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, assigned_to, estimated_value, notes } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Update lead
    const updateData = {
      updated_at: new Date().toISOString(),
    };

    if (status) updateData.status = status;
    if (assigned_to !== undefined) updateData.assigned_to = assigned_to;
    if (estimated_value !== undefined) updateData.estimated_value = estimated_value;

    const { data: updatedLead, error } = await supabaseAdmin
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating lead:', error);
      return NextResponse.json(
        { error: 'Failed to update lead' },
        { status: 500 }
      );
    }

    // Add note if provided
    if (notes) {
      await supabaseAdmin
        .from('lead_notes')
        .insert([{
          lead_id: id,
          note: notes,
          note_type: 'general',
          created_by: 'admin',
        }]);
    }

    return NextResponse.json({ lead: updatedLead });

  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}