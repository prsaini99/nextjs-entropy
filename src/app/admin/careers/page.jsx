'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminFetch, adminPut } from '@/lib/admin-fetch';

// Hiring pipeline, one direction of travel. Every historical row is 'new'
// (the table predates any triage tooling), so the dropdown defaults there.
const STATUSES = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'reviewing', label: 'Reviewing', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'shortlisted', label: 'Shortlisted', color: 'bg-purple-100 text-purple-800' },
  { value: 'interview', label: 'Interview', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'offer', label: 'Offer', color: 'bg-green-100 text-green-800' },
  { value: 'hired', label: 'Hired', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];

export default function CareersPage() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    job_title: '',
    has_resume: '',
    date_from: '',
    date_to: '',
    search: '',
    page: 1,
    sort_by: 'created_at',
    sort_order: 'desc',
  });

  // Debounce the search box: at 1,600+ rows a request per keystroke is a
  // request per keystroke too many.
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((prev) =>
        prev.search === searchInput ? prev : { ...prev, search: searchInput, page: 1 }
      );
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    fetchApplications();
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminFetch('/api/admin/careers/stats');
      if (response.ok) setStats(await response.json());
    } catch (err) {
      console.error('Failed to fetch career stats:', err);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await adminFetch(`/api/admin/careers?${params}`);
      if (!response.ok) throw new Error('Failed to fetch applications');

      const data = await response.json();
      setApplications(data.applications);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await adminPut('/api/admin/careers', { id, status: newStatus });
      if (!response.ok) throw new Error('Failed to update application');
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      alert('Error updating application: ' + err.message);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Career Applications</h1>
          <p className="mt-2 text-sm text-gray-700">
            Triage job applications — email notifications are muted, this page is the inbox
          </p>
        </div>
      </div>

      {stats && (
        <StatsPanel
          stats={stats}
          onJobTitleClick={(title) =>
            handleFilterChange('job_title', filters.job_title === title ? '' : title)
          }
          activeJobTitle={filters.job_title}
        />
      )}

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={filters.job_title}
            onChange={(e) => handleFilterChange('job_title', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Roles</option>
            {Object.keys(stats?.by_job_title || {}).map((title) => (
              <option key={title} value={title}>
                {title} ({stats.by_job_title[title]})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CV</label>
          <select
            value={filters.has_resume}
            onChange={(e) => handleFilterChange('has_resume', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Any</option>
            <option value="yes">Has CV</option>
            <option value="no">No CV</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <input
            type="date"
            value={filters.date_from}
            onChange={(e) => handleFilterChange('date_from', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <input
            type="date"
            value={filters.date_to}
            onChange={(e) => handleFilterChange('date_to', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Name, email, skills, university..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="mt-8 w-full">
        <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
          {loading ? (
            <div className="bg-white px-6 py-12">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-2 text-gray-600">Loading applications...</span>
              </div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {app.first_name} {app.last_name}
                      </div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                      {app.location && (
                        <div className="text-xs text-gray-400">{app.location}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-[16rem] truncate" title={app.job_title}>
                        {app.job_title}
                      </div>
                      {app.university && (
                        <div className="text-xs text-gray-500 max-w-[16rem] truncate" title={app.university}>
                          {app.university}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {app.years_of_experience || '—'}
                      </div>
                      {app.current_company && (
                        <div className="text-xs text-gray-500 max-w-[10rem] truncate" title={app.current_company}>
                          {app.current_company}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {app.resume_path ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          📄 Yes
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusDropdown
                        currentStatus={app.status}
                        applicationId={app.id}
                        onStatusChange={updateStatus}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.created_at).toLocaleDateString()}
                      <div className="text-xs text-gray-400">
                        {new Date(app.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/careers/${app.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                      No applications match these filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {pagination && (
        <div className="w-full mt-6">
          <Pagination
            pagination={pagination}
            onPageChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
          />
        </div>
      )}
    </div>
  );
}

function StatsPanel({ stats, onJobTitleClick, activeJobTitle }) {
  const maxDay = Math.max(1, ...stats.by_day.map((d) => d.count));
  const topRoles = Object.entries(stats.by_job_title).slice(0, 8);
  const sources = Object.entries(stats.by_referral_source).slice(0, 6);

  return (
    <div className="mt-6 space-y-4">
      {/* Headline cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total applications" value={stats.total} />
        <StatCard label="Today" value={stats.today} accent="text-green-600" />
        <StatCard label="With CV" value={stats.with_resume} />
        <StatCard
          label="Awaiting review"
          value={stats.by_status?.new || 0}
          accent="text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* 14-day volume */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Last 14 days</h3>
          <div className="flex items-end space-x-1 h-24">
            {stats.by_day.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center" title={`${d.date}: ${d.count}`}>
                <div
                  className="w-full bg-indigo-500 rounded-t"
                  style={{ height: `${Math.max(2, (d.count / maxDay) * 100)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{stats.by_day[0]?.date.slice(5)}</span>
            <span>{stats.by_day[stats.by_day.length - 1]?.date.slice(5)}</span>
          </div>
        </div>

        {/* Top roles — click to filter */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Top roles <span className="font-normal text-gray-400">(click to filter)</span>
          </h3>
          <div className="space-y-1">
            {topRoles.map(([title, n]) => (
              <button
                key={title}
                onClick={() => onJobTitleClick(title)}
                className={`w-full flex justify-between items-center text-left text-sm px-2 py-1 rounded ${
                  activeJobTitle === title
                    ? 'bg-indigo-100 text-indigo-800 font-medium'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="truncate mr-2">{title}</span>
                <span className="text-gray-500 flex-shrink-0">{n}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Referral sources</h3>
          <div className="space-y-1">
            {sources.map(([source, n]) => (
              <div key={source} className="flex justify-between text-sm px-2 py-1">
                <span className="text-gray-700 truncate mr-2">{source}</span>
                <span className="text-gray-500 flex-shrink-0">{n}</span>
              </div>
            ))}
          </div>
          {stats.truncated && (
            <p className="text-xs text-amber-600 mt-2">
              Stats computed over the newest 30,000 rows only.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent = 'text-gray-900' }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`text-2xl font-bold ${accent}`}>{value?.toLocaleString?.() ?? value}</div>
    </div>
  );
}

function StatusDropdown({ currentStatus, applicationId, onStatusChange }) {
  const current = STATUSES.find((s) => s.value === currentStatus);

  return (
    <select
      value={currentStatus || 'new'}
      onChange={(e) => onStatusChange(applicationId, e.target.value)}
      className={`text-xs font-medium rounded-full border-none focus:ring-2 focus:ring-indigo-500 ${current?.color || 'bg-gray-100 text-gray-800'}`}
    >
      {STATUSES.map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
}

function Pagination({ pagination, onPageChange }) {
  const { page, total_pages, total, has_prev, has_next } = pagination;

  return (
    <div className="w-full bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
      <div>
        <p className="text-sm text-gray-700">
          Page <span className="font-medium">{page}</span> of{' '}
          <span className="font-medium">{total_pages}</span>
          {' · '}
          <span className="font-medium">{total?.toLocaleString?.()}</span> applications
        </p>
      </div>
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!has_prev}
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!has_next}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
