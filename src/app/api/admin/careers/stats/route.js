import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Aggregates for the careers triage page. Computed in JS over a paged fetch of
// the few columns we group on, rather than PostgREST aggregate functions —
// those are disabled on hosted Supabase by default, and at the current scale
// (~1.7k rows, one applicant flood in) a 1000-row-per-page loop is cheap. The
// hard cap keeps a future flood from turning this route into an
// unbounded-memory fetch; if it's ever hit, the response says so.
const PAGE = 1000;
const MAX_ROWS = 30000;

export async function GET() {
  try {
    const rows = [];
    let truncated = false;
    for (let from = 0; from < MAX_ROWS; from += PAGE) {
      const { data, error } = await supabaseAdmin
        .from('career_applications')
        .select('job_title, status, created_at, utm_source, university, resume_path')
        .order('created_at', { ascending: false })
        .range(from, from + PAGE - 1);

      if (error) {
        console.error('Error fetching career stats page:', error);
        return NextResponse.json(
          { error: 'Failed to compute stats' },
          { status: 500 }
        );
      }
      rows.push(...data);
      if (data.length < PAGE) break;
      if (rows.length >= MAX_ROWS) { truncated = true; break; }
    }

    const count = (key) => {
      const out = {};
      for (const row of rows) {
        const v = row[key] || '(none)';
        out[v] = (out[v] || 0) + 1;
      }
      return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
    };

    // IST day boundaries, matching how the rest of the stack reports dates.
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
    const istDay = (iso) =>
      new Date(new Date(iso).getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);

    const byDay = {};
    for (const row of rows) {
      const d = istDay(row.created_at);
      byDay[d] = (byDay[d] || 0) + 1;
    }
    const today = istDay(new Date().toISOString());
    const last14 = [];
    for (let i = 13; i >= 0; i--) {
      const d = istDay(new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString());
      last14.push({ date: d, count: byDay[d] || 0 });
    }

    return NextResponse.json({
      total: rows.length,
      truncated,
      today: byDay[today] || 0,
      with_resume: rows.filter((r) => r.resume_path).length,
      by_day: last14,
      by_job_title: count('job_title'),
      by_status: count('status'),
      by_utm_source: count('utm_source'),
      by_university: count('university'),
    });

  } catch (error) {
    console.error('Error in career stats API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
