'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/admin/dashboard?enhanced=true');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-red-800">Dashboard Error</h3>
            <p className="mt-2 text-red-700">{error}</p>
            <button 
              onClick={fetchDashboardData}
              className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { summary, lead_quality, recent_activities, alerts, enhanced_analytics } = dashboardData;

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard Overview</h1>
            <p className="text-blue-100 text-lg">
              Real-time insights into your lead pipeline and business performance
            </p>
            <div className="mt-4 flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${refreshing ? 'bg-yellow-300 animate-pulse' : 'bg-green-300'}`}></div>
                <span className="text-blue-100">
                  {refreshing ? 'Updating...' : 'Live Data'}
                </span>
              </div>
              <div className="text-blue-200">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-0">
            <button
              onClick={fetchDashboardData}
              disabled={refreshing}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 disabled:opacity-50 px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 border border-white/20"
            >
              <svg className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Smart Alerts with Enhanced Styling */}
      {alerts && alerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="text-2xl mr-3">🚨</span>
            Smart Alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert, index) => (
              <AlertCard key={index} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* Enhanced KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Total Leads"
          value={summary.leads.total}
          subtitle={`${summary.recent_counts.last_7_days} this week`}
          icon="👥"
          color="blue"
          trend={`+${((summary.recent_counts.last_7_days / summary.recent_counts.last_30_days) * 100).toFixed(1)}%`}
          trendDirection="up"
          sparklineData={[12, 19, 15, 27, 32, 25, 18]}
        />
        <KPICard
          title="Active Pipeline"
          value={summary.leads.qualified + summary.leads.proposal_sent}
          subtitle="Qualified opportunities"
          icon="🎯"
          color="green"
          trend={`${summary.conversion_rates.lead_to_qualified}%`}
          trendDirection="up"
          sparklineData={[5, 8, 12, 15, 18, 14, 16]}
        />
        <KPICard
          title="Pipeline Value"
          value={`₹${(summary.pipeline_value.active / 100000).toFixed(1)}L`}
          subtitle="Active deals"
          icon="💰"
          color="purple"
          trend="+18.5%"
          trendDirection="up"
          sparklineData={[20, 35, 42, 38, 55, 60, 58]}
        />
        <KPICard
          title="Conversion Rate"
          value={`${summary.conversion_rates.overall_conversion}%`}
          subtitle="Lead to customer"
          icon="📈"
          color="emerald"
          trend="+2.3%"
          trendDirection="up"
          sparklineData={[8, 12, 15, 13, 18, 22, 20]}
        />
      </div>

      {/* Enhanced Pipeline & Quality Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Pipeline Overview */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Revenue Pipeline</h3>
            <p className="text-gray-600">Active opportunities and revenue tracking</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ₹{(summary.pipeline_value.active / 100000).toFixed(1)}L
                </div>
                <div className="text-sm text-blue-600 font-semibold mb-1">ACTIVE PIPELINE</div>
                <div className="text-xs text-gray-600">{summary.leads.qualified + summary.leads.proposal_sent} opportunities</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  ₹{(summary.pipeline_value.won / 100000).toFixed(1)}L
                </div>
                <div className="text-sm text-green-600 font-semibold mb-1">REVENUE WON</div>
                <div className="text-xs text-gray-600">{summary.leads.won} closed deals</div>
              </div>
            </div>
            
            {/* Pipeline Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                <span>Pipeline Progress</span>
                <span>{summary.conversion_rates.overall_conversion}% converted</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${summary.conversion_rates.overall_conversion}%` }}
                ></div>
              </div>
            </div>

            {/* Lead Status Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatusMetric label="New" value={summary.leads.new} color="blue" />
              <StatusMetric label="Contacted" value={summary.leads.contacted} color="yellow" />
              <StatusMetric label="Qualified" value={summary.leads.qualified} color="green" />
              <StatusMetric label="Won" value={summary.leads.won} color="purple" />
            </div>
          </div>
        </div>

        {/* Enhanced Lead Quality */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Lead Quality</h3>
            <p className="text-gray-600 text-sm">Score distribution</p>
          </div>
          <div className="p-6 space-y-6">
            <QualityMetric 
              label="High Quality" 
              value={lead_quality.high} 
              total={lead_quality.high + lead_quality.medium + lead_quality.low}
              color="green"
              range="80-100"
            />
            <QualityMetric 
              label="Medium Quality" 
              value={lead_quality.medium} 
              total={lead_quality.high + lead_quality.medium + lead_quality.low}
              color="yellow"
              range="60-79"
            />
            <QualityMetric 
              label="Low Quality" 
              value={lead_quality.low} 
              total={lead_quality.high + lead_quality.medium + lead_quality.low}
              color="red"
              range="0-59"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Recent Activities */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Recent Activities</h3>
              <p className="text-gray-600">Latest lead submissions and updates</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {recent_activities.length} recent
              </div>
              <a 
                href="/admin/leads"
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
              >
                View All →
              </a>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {recent_activities.slice(0, 8).map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      </div>

      {/* Enhanced Analytics Preview */}
      {enhanced_analytics && !enhanced_analytics.error && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Analytics Preview</h3>
                <p className="text-gray-600">Quick insights from advanced analytics</p>
              </div>
              <a 
                href="/admin/analytics"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                View Full Analytics
              </a>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {enhanced_analytics.top_services?.slice(0, 3).map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">{service.service}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{service.total_requests}</div>
                  <div className="text-sm text-gray-600">requests</div>
                  <div className="mt-3 text-sm">
                    <span className="text-green-600 font-semibold">{service.win_rate}%</span>
                    <span className="text-gray-500"> win rate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Component Definitions
function KPICard({ title, value, subtitle, icon, color, trend, trendDirection, sparklineData }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    emerald: 'from-emerald-500 to-emerald-600',
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
      <div className={`bg-gradient-to-br ${colorClasses[color]} p-6 text-white relative`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
            <p className="text-3xl font-bold mb-1">{value}</p>
            <p className="text-sm opacity-75">{subtitle}</p>
          </div>
          <div className="text-4xl opacity-80 ml-4">{icon}</div>
        </div>
        
        {/* Mini Sparkline */}
        {sparklineData && (
          <div className="mt-4 opacity-60">
            <svg width="100" height="20" className="overflow-visible">
              <polyline
                points={sparklineData.map((value, index) => `${index * 16},${20 - (value / Math.max(...sparklineData)) * 15}`).join(' ')}
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="drop-shadow-sm"
              />
            </svg>
          </div>
        )}
      </div>
      
      {trend && (
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
          <div className={`flex items-center text-sm ${
            trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <svg className={`w-4 h-4 mr-2 ${trendDirection === 'up' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
            <span className="font-bold">{trend}</span>
            <span className="ml-2 text-gray-500 font-normal">vs last period</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AlertCard({ alert }) {
  const alertStyles = {
    warning: {
      bg: 'from-yellow-50 to-orange-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-500',
      title: 'text-yellow-800',
      text: 'text-yellow-700'
    },
    success: {
      bg: 'from-green-50 to-emerald-50',
      border: 'border-green-200',
      icon: 'text-green-500',
      title: 'text-green-800',
      text: 'text-green-700'
    },
    info: {
      bg: 'from-blue-50 to-indigo-50',
      border: 'border-blue-200',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      text: 'text-blue-700'
    }
  };

  const style = alertStyles[alert.type] || alertStyles.info;

  return (
    <div className={`bg-gradient-to-br ${style.bg} ${style.border} border-2 rounded-2xl p-6 shadow-lg`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertIcon type={alert.type} className={`h-6 w-6 ${style.icon}`} />
        </div>
        <div className="ml-4 flex-1">
          <h3 className={`text-lg font-bold ${style.title} mb-2`}>
            {alert.title}
          </h3>
          <p className={`${style.text} mb-3`}>
            {alert.message}
          </p>
          {alert.action && (
            <button className={`text-sm font-semibold ${style.title} hover:underline`}>
              {alert.action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusMetric({ label, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  return (
    <div className={`${colorClasses[color]} border-2 rounded-2xl p-4 text-center`}>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
}

function QualityMetric({ label, value, total, color, range }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  const colorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-gray-900">{label}</div>
          <div className="text-sm text-gray-500">Score: {range}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`${colorClasses[color]} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function ActivityItem({ activity }) {
  return (
    <div className="px-8 py-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-lg ${
            activity.type === 'lead' 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
              : 'bg-gradient-to-br from-green-500 to-green-600 text-white'
          }`}>
            {activity.type === 'lead' ? '👤' : '💼'}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
              {activity.title}
            </h4>
            <p className="text-sm text-gray-600">{activity.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <StatusBadge status={activity.status} />
        </div>
      </div>
    </div>
  );
}

function AlertIcon({ type, className }) {
  if (type === 'warning') {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>;
  }
  
  if (type === 'success') {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>;
  }
  
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>;
}

function StatusBadge({ status }) {
  const statusStyles = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    qualified: 'bg-green-100 text-green-800 border-green-200',
    proposal_sent: 'bg-purple-100 text-purple-800 border-purple-200',
    won: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    lost: 'bg-red-100 text-red-800 border-red-200',
    reviewing: 'bg-orange-100 text-orange-800 border-orange-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border-2 ${statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {status.replace('_', ' ').toUpperCase()}
    </span>
  );
}