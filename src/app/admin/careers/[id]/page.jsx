'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminFetch, adminPut } from '@/lib/admin-fetch';

const STATUSES = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'reviewing', label: 'Reviewing', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'shortlisted', label: 'Shortlisted', color: 'bg-purple-100 text-purple-800' },
  { value: 'interview', label: 'Interview', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'offer', label: 'Offer', color: 'bg-green-100 text-green-800' },
  { value: 'hired', label: 'Hired', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [application, setApplication] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    setLoading(true);
    try {
      const response = await adminFetch(`/api/admin/careers/${id}`);
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'Application not found' : 'Failed to load application');
      }
      const data = await response.json();
      setApplication(data.application);
      setResumeUrl(data.resume_url);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await adminPut(`/api/admin/careers/${id}`, { status: newStatus });
      if (!response.ok) throw new Error('Failed to update status');
      setApplication((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  // The signed URL expires 10 minutes after the page loaded. If the reviewer
  // left the tab open past that, re-fetch a fresh one instead of handing them
  // a link that 400s.
  const openResume = async () => {
    let url = resumeUrl;
    try {
      const response = await adminFetch(`/api/admin/careers/${id}`);
      if (response.ok) {
        const data = await response.json();
        url = data.resume_url || url;
        setResumeUrl(url);
      }
    } catch {
      // fall through to whatever URL we already have
    }
    if (url) window.open(url, '_blank', 'noopener');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2 text-gray-600">Loading application...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">Error: {error}</div>
        <button
          onClick={() => router.push('/admin/careers')}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-900"
        >
          ← Back to applications
        </button>
      </div>
    );
  }

  const app = application;
  const currentStatus = STATUSES.find((s) => s.value === app.status);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <Link href="/admin/careers" className="text-sm text-indigo-600 hover:text-indigo-900">
            ← Back to applications
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            {app.first_name} {app.last_name}
          </h1>
          <p className="text-gray-600">{app.job_title}</p>
          <p className="text-sm text-gray-400">
            Applied {new Date(app.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {app.resume_path && (
            <button
              onClick={openResume}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 shadow"
            >
              📄 View CV
              {app.resume_filename && (
                <span className="ml-2 text-indigo-200 font-normal max-w-[12rem] truncate">
                  {app.resume_filename}
                </span>
              )}
            </button>
          )}
          <select
            value={app.status || 'new'}
            onChange={(e) => updateStatus(e.target.value)}
            className={`text-sm font-medium rounded-lg border-none focus:ring-2 focus:ring-indigo-500 px-3 py-2 ${currentStatus?.color || 'bg-gray-100 text-gray-800'}`}
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Contact + logistics */}
        <Section title="Contact">
          <Field label="Email">
            <a href={`mailto:${app.email}`} className="text-indigo-600 hover:underline">{app.email}</a>
          </Field>
          <Field label="Phone">{app.phone}</Field>
          <Field label="Location">{app.location}</Field>
          <Field label="Work eligibility">{app.work_eligibility}</Field>
          <Field label="Visa status">{app.visa_status}</Field>
          <Field label="LinkedIn">
            {app.linkedin_url && (
              <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all">{app.linkedin_url}</a>
            )}
          </Field>
          <Field label="GitHub">
            {app.github_url && (
              <a href={app.github_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all">{app.github_url}</a>
            )}
          </Field>
          <Field label="Portfolio">
            {app.portfolio_url && (
              <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all">{app.portfolio_url}</a>
            )}
          </Field>
        </Section>

        {/* Background */}
        <Section title="Background">
          <Field label="Experience">{app.years_of_experience}</Field>
          <Field label="Current role">{app.current_position}</Field>
          <Field label="Current company">{app.current_company}</Field>
          <Field label="Education">{app.education}</Field>
          <Field label="University">{app.university}</Field>
          <Field label="Graduation year">{app.graduation_year}</Field>
          <Field label="Available from">{app.availability_date}</Field>
          <Field label="Salary expectation">{app.salary_expectations}</Field>
        </Section>

        {/* Attribution */}
        <Section title="Source">
          <Field label="Referral source">{app.referral_source}</Field>
          <Field label="UTM source / medium">
            {[app.utm_source, app.utm_medium].filter(Boolean).join(' / ')}
          </Field>
          <Field label="UTM campaign">{app.utm_campaign}</Field>
          <Field label="Landing page">
            <span className="break-all">{app.landing_page}</span>
          </Field>
          <Field label="Referrer">
            <span className="break-all">{app.referrer}</span>
          </Field>
          <Field label="Consent">
            Privacy: {app.privacy_consent ? 'yes' : 'no'} · Communication: {app.communication_consent ? 'yes' : 'no'}
          </Field>
        </Section>
      </div>

      {/* Free-text sections */}
      <div className="mt-6 space-y-6">
        <TextBlock title="Technical skills / key strengths" text={app.technical_skills} />
        <TextBlock title="Relevant experience / projects" text={app.relevant_projects} />
        <TextBlock title="Role-specific answers" text={app.role_answers} />
        <TextBlock title="Additional information" text={app.additional_info} />
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">{title}</h2>
      <dl className="space-y-2">{children}</dl>
    </div>
  );
}

function Field({ label, children }) {
  const empty =
    children === null || children === undefined || children === '' ||
    (Array.isArray(children) && children.every((c) => !c));
  return (
    <div className="flex justify-between gap-4 text-sm">
      <dt className="text-gray-500 flex-shrink-0">{label}</dt>
      <dd className="text-gray-900 text-right min-w-0">{empty ? <span className="text-gray-300">—</span> : children}</dd>
    </div>
  );
}

function TextBlock({ title, text }) {
  if (!text) return null;
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">{title}</h2>
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{text}</p>
    </div>
  );
}
