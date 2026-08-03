import { NextResponse } from 'next/server';
// Service-role client, not the anon one: career_applications has RLS with no
// anon policies (the same trap that broke the apply route's inserts), so the
// anon client's reads return empty sets. Access control lives in middleware.js,
// which already denies every /api/admin/* request without an allowlisted admin
// session — the service key here never widens who can reach this data.
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = Math.min(parseInt(searchParams.get('limit')) || 25, 100);
    const status = searchParams.get('status');
    const job_title = searchParams.get('job_title');
    const search = searchParams.get('search');
    const date_from = searchParams.get('date_from');
    const date_to = searchParams.get('date_to');
    const has_resume = searchParams.get('has_resume');
    const sort_by = searchParams.get('sort_by') || 'created_at';
    const sort_order = searchParams.get('sort_order') || 'desc';

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // The list view never needs the essay fields; keeping them out of the
    // select keeps 25-row pages small even though rows carry long free text.
    let query = supabaseAdmin
      .from('career_applications')
      .select(
        'id, job_title, first_name, last_name, email, phone, location, university, years_of_experience, current_position, current_company, salary_expectations, availability_date, referral_source, utm_source, status, resume_path, resume_filename, created_at',
        { count: 'exact' }
      )
      .range(from, to)
      .order(sort_by, { ascending: sort_order === 'asc' });

    if (status) query = query.eq('status', status);
    if (job_title) query = query.eq('job_title', job_title);
    if (date_from) query = query.gte('created_at', `${date_from}T00:00:00.000Z`);
    if (date_to) query = query.lt('created_at', `${date_to}T23:59:59.999Z`);
    if (has_resume === 'yes') query = query.not('resume_path', 'is', null);
    if (has_resume === 'no') query = query.is('resume_path', null);

    if (search) {
      // Commas and parens are PostgREST or() syntax; strip them so a pasted
      // "Lastname, Firstname" can't break the filter expression.
      const s = search.replace(/[,()]/g, ' ').trim();
      if (s) {
        query = query.or(
          `first_name.ilike.%${s}%,last_name.ilike.%${s}%,email.ilike.%${s}%,phone.ilike.%${s}%,university.ilike.%${s}%,location.ilike.%${s}%,current_company.ilike.%${s}%,technical_skills.ilike.%${s}%`
        );
      }
    }

    const { data: applications, error, count } = await query;

    if (error) {
      console.error('Error fetching career applications:', error);
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      applications,
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
    console.error('Error in career applications API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    const { data: updatedApplication, error } = await supabaseAdmin
      .from('career_applications')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating career application:', error);
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      );
    }

    return NextResponse.json({ application: updatedApplication });

  } catch (error) {
    console.error('Error updating career application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
