'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLeadPriority } from '@/lib/supabase';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchLeadDetails();
    }
  }, [params.id]);

  const fetchLeadDetails = async () => {
    try {
      const response = await fetch(`/api/admin/leads/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch lead details');
      }
      
      const data = await response.json();
      setLead(data.lead);
      setNotes(data.notes || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async (updates) => {
    try {
      const response = await fetch(`/api/admin/leads/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead');
      }

      const data = await response.json();
      setLead(data.lead);
    } catch (err) {
      alert('Error updating lead: ' + err.message);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;

    setSavingNote(true);
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: params.id,
          notes: newNote,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      setNewNote('');
      fetchLeadDetails(); // Refresh to get the new note
    } catch (err) {
      alert('Error adding note: ' + err.message);
    } finally {
      setSavingNote(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">Error: {error}</div>
        <Link href="/admin/leads" className="text-red-600 hover:text-red-900 underline">
          Back to leads
        </Link>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Lead not found</p>
        <Link href="/admin/leads" className="text-indigo-600 hover:text-indigo-900 underline">
          Back to leads
        </Link>
      </div>
    );
  }

  const priority = getLeadPriority(lead.lead_score);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/admin/leads" className="text-gray-400 hover:text-gray-500">
                Leads
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-4 text-sm font-medium text-gray-500">{lead.full_name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Lead Info Card */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {lead.full_name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {lead.work_email}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <PriorityBadge priority={priority} />
                <LeadScore score={lead.lead_score} />
              </div>
            </div>
            
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Service</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{lead.service}</dd>
                </div>
                
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Budget</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {lead.budget || 'Not specified'}
                  </dd>
                </div>
                
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Timeline</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{lead.timeline}</dd>
                </div>
                
                {lead.phone && (
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <a href={`tel:${lead.phone}`} className="text-indigo-600 hover:text-indigo-900">
                        {lead.phone}
                      </a>
                    </dd>
                  </div>
                )}
                
                {lead.company_website && (
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Company Website</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <a 
                        href={lead.company_website.startsWith('http') ? lead.company_website : `https://${lead.company_website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {lead.company_website}
                      </a>
                    </dd>
                  </div>
                )}
                
                {lead.project_summary && (
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Project Summary</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {lead.project_summary}
                    </dd>
                  </div>
                )}
                
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(lead.created_at).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* UTM Attribution */}
          {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Marketing Attribution
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  UTM tracking data for this lead
                </p>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  {lead.utm_source && (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Source</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{lead.utm_source}</dd>
                    </div>
                  )}
                  
                  {lead.utm_medium && (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Medium</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{lead.utm_medium}</dd>
                    </div>
                  )}
                  
                  {lead.utm_campaign && (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Campaign</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{lead.utm_campaign}</dd>
                    </div>
                  )}
                  
                  {lead.landing_page && (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Landing Page</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{lead.landing_page}</dd>
                    </div>
                  )}
                  
                  {lead.referrer && lead.referrer !== 'direct' && (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Referrer</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{lead.referrer}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Status & Actions */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Lead Management
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={lead.status}
                    onChange={(e) => updateLead({ status: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    value={lead.assigned_to || ''}
                    onChange={(e) => updateLead({ assigned_to: e.target.value })}
                    placeholder="Email or name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Value (₹)
                  </label>
                  <input
                    type="number"
                    value={lead.estimated_value || ''}
                    onChange={(e) => updateLead({ estimated_value: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Notes
              </h3>
              
              {/* Add Note */}
              <div className="mb-6">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                  placeholder="Add a note..."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  onClick={addNote}
                  disabled={!newNote.trim() || savingNote}
                  className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {savingNote ? 'Adding...' : 'Add Note'}
                </button>
              </div>
              
              {/* Notes List */}
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="border-l-4 border-gray-200 pl-4">
                    <div className="text-sm text-gray-900">{note.note}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {note.created_by} • {new Date(note.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
                {notes.length === 0 && (
                  <p className="text-sm text-gray-500">No notes yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const colors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[priority.level]}`}>
      {priority.label}
    </span>
  );
}

function LeadScore({ score }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(score)}`}>
      Score: {score}/100
    </span>
  );
}