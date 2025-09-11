'use client';

import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/analytics?period=30&type=overview');
      if (!response.ok) throw new Error('Failed to fetch analytics data');
      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Analytics</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchAnalyticsData}
          className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  const data = analyticsData || {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-blue-100">Comprehensive insights into your lead performance</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'sources', label: 'Traffic Sources', icon: '🔗' },
              { id: 'quality', label: 'Lead Quality', icon: '⭐' },
              { id: 'timeline', label: 'Timeline', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab data={data} />}
          {activeTab === 'sources' && <SourcesTab data={data} />}
          {activeTab === 'quality' && <QualityTab data={data} />}
          {activeTab === 'timeline' && <TimelineTab data={data} />}
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ data }) {
  const overview = data.overview || {};
  
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Leads"
          value={overview.total_leads || 0}
          icon="👥"
          color="blue"
          change="+12%"
        />
        <KPICard
          title="New Leads"
          value={overview.new_leads || 0}
          icon="✨"
          color="green"
          change="+8%"
        />
        <KPICard
          title="Qualified"
          value={overview.qualified_leads || 0}
          icon="🎯"
          color="purple"
          change="+15%"
        />
        <KPICard
          title="Won Deals"
          value={overview.won_leads || 0}
          icon="🏆"
          color="orange"
          change="+22%"
        />
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">Lead Status Distribution</h3>
        <StatusChart data={data.status_distribution || []} />
      </div>
    </div>
  );
}

// Sources Tab Component
function SourcesTab({ data }) {
  const sources = data.utm_performance || [];
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Traffic Sources Performance</h3>
      
      {sources.length > 0 ? (
        <div className="grid gap-4">
          {sources.map((source, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{source.source || 'Direct'}</h4>
                <span className="text-sm text-gray-500">{source.total_leads || 0} leads</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${Math.min((source.total_leads || 0) * 10, 100)}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Conversion: {source.conversion_rate || 0}%
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No traffic source data available" />
      )}
    </div>
  );
}

// Quality Tab Component
function QualityTab({ data }) {
  const quality = data.lead_quality || [];
  const colors = ['#10B981', '#F59E0B', '#EF4444'];
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Lead Quality Distribution</h3>
      
      <div className="grid gap-4">
        {quality.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{item.range}</span>
              <span className="text-lg font-bold" style={{ color: colors[index] }}>
                {item.count}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 rounded-full" 
                style={{ 
                  width: `${item.percentage}%`,
                  backgroundColor: colors[index]
                }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {item.percentage}% of total leads
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Timeline Tab Component
function TimelineTab({ data }) {
  const timeline = data.timeline || [];
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Lead Timeline</h3>
      
      {timeline.length > 0 ? (
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{item.date}</div>
                <div className="text-sm text-gray-600">{item.leads} leads</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(item.leads * 2, 100)}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{item.leads}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No timeline data available" />
      )}
    </div>
  );
}

// KPI Card Component
function KPICard({ title, value, icon, color, change }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`bg-gradient-to-r ${colorClasses[color]} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="text-4xl opacity-80">{icon}</div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm">
          <span className="text-green-600 font-medium">{change}</span>
          <span className="text-gray-500 ml-2">vs last month</span>
        </div>
      </div>
    </div>
  );
}

// Status Chart Component (CSS-based)
function StatusChart({ data }) {
  if (!data || data.length === 0) {
    return <EmptyState message="No status data available" />;
  }

  const total = data.reduce((sum, item) => sum + (item.count || 0), 0);
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const percentage = total > 0 ? (item.count / total) * 100 : 0;
        return (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-24 text-sm font-medium">{item.status}</div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="h-4 rounded-full flex items-center justify-end pr-2"
                  style={{ 
                    width: `${Math.max(percentage, 5)}%`,
                    backgroundColor: colors[index % colors.length]
                  }}
                >
                  <span className="text-xs text-white font-medium">
                    {item.count}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-16 text-sm text-gray-600 text-right">
              {percentage.toFixed(1)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Empty State Component
function EmptyState({ message }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">📊</div>
      <p className="text-gray-500">{message}</p>
      <p className="text-sm text-gray-400 mt-2">Data will appear here once you have leads</p>
    </div>
  );
}