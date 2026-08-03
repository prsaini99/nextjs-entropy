import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    const { data: application, error } = await supabaseAdmin
      .from('career_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Application not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching application:', error);
      return NextResponse.json(
        { error: 'Failed to fetch application' },
        { status: 500 }
      );
    }

    // The resumes bucket is private; the browser can never hit it directly.
    // A short-lived signed URL is minted per view, so a leaked link goes stale
    // in minutes and nothing durable ever leaves the server.
    let resume_url = null;
    if (application.resume_path) {
      const { data: signed, error: signError } = await supabaseAdmin.storage
        .from('resumes')
        .createSignedUrl(application.resume_path, 600);
      if (signError) {
        console.error('Error signing resume URL:', signError);
      } else {
        resume_url = signed?.signedUrl || null;
      }
    }

    return NextResponse.json({ application, resume_url });

  } catch (error) {
    console.error('Error in application details API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Application ID and status are required' },
        { status: 400 }
      );
    }

    const { data: application, error } = await supabaseAdmin
      .from('career_applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating application:', error);
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      );
    }

    return NextResponse.json({ application });

  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
