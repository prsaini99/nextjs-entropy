'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  Scatter,
  ScatterChart,
} from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16'];

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [advancedData, setAdvancedData] = useState(null);
  const [realTimeData, setRealTimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllData();
    // Set up auto-refresh for real-time data
    const interval = setInterval(() => {
      if (activeTab === 'real-time') {
        fetchRealTimeData();
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [period, activeTab]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchAnalyticsData(),
        fetchAdvancedData(),
        fetchRealTimeData()
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyticsData = async () => {
    const response = await fetch(`/api/admin/analytics?period=${period}&type=overview`);
    if (!response.ok) throw new Error('Failed to fetch analytics data');
    const data = await response.json();
    setAnalyticsData(data);
  };

  const fetchAdvancedData = async () => {
    const response = await fetch(`/api/admin/analytics?period=${period}&type=advanced`);
    if (!response.ok) throw new Error('Failed to fetch advanced data');
    const data = await response.json();
    setAdvancedData(data);
  };

  const fetchRealTimeData = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/admin/realtime?metric=dashboard');
      if (!response.ok) throw new Error('Failed to fetch real-time data');
      const data = await response.json();
      setRealTimeData(data);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Advanced Analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-red-800">Analytics Error</h3>
            <p className="mt-1 text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Advanced Analytics</h1>
            <p className="mt-2 text-blue-100 text-lg">
              Comprehensive insights into your marketing performance and lead pipeline
            </p>
          </div>
          <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-white text-gray-900 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <button
              onClick={fetchAllData}
              disabled={refreshing}
              className="bg-blue-500 hover:bg-blue-400 disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            { id: 'overview', name: 'Overview', icon: '📊' },
            { id: 'advanced', name: 'Advanced Analytics', icon: '🔍' },
            { id: 'real-time', name: 'Real-time', icon: '⚡' },
            { id: 'forecasting', name: 'Forecasting', icon: '📈' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all flex items-center space-x-2`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && analyticsData && (
        <OverviewTab data={analyticsData} period={period} />
      )}

      {activeTab === 'advanced' && advancedData && (
        <AdvancedTab data={advancedData} period={period} />
      )}

      {activeTab === 'real-time' && realTimeData && (
        <RealTimeTab data={realTimeData} refreshing={refreshing} />
      )}

      {activeTab === 'forecasting' && (
        <ForecastingTab period={period} />
      )}
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ data, period }) {
  const { overview, status_distribution, utm_performance, timeline, top_sources, conversion_rates, lead_quality } = data;

  return (
    <div className="space-y-8">
      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Total Leads"
          value={overview.total_leads}
          subtitle={`${period} days`}
          icon="👥"
          color="blue"
          trend="+12%"
          trendDirection="up"
        />
        <KPICard
          title="Conversion Rate"
          value={`${((overview.won_leads / overview.total_leads) * 100).toFixed(1)}%`}
          subtitle="Overall performance"
          icon="🎯"
          color="green"
          trend="+2.3%"
          trendDirection="up"
        />
        <KPICard
          title="Pipeline Value"
          value="₹2.4M"
          subtitle="Active opportunities"
          icon="💰"
          color="purple"
          trend="+18%"
          trendDirection="up"
        />
        <KPICard
          title="Avg. Lead Score"
          value="76.3"
          subtitle="Quality indicator"
          icon="⭐"
          color="yellow"
          trend="-1.2%"
          trendDirection="down"
        />
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Lead Timeline with Area Chart */}
        <ChartCard title="Lead Generation Timeline" subtitle="Daily lead acquisition over time">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeline}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorQualified" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
                stroke="#6B7280"
              />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area type="monotone" dataKey="total" stackId="1" stroke="#3B82F6" fill="url(#colorTotal)" name="Total Leads" />
              <Area type="monotone" dataKey="qualified" stackId="1" stroke="#10B981" fill="url(#colorQualified)" name="Qualified" />
              <Line type="monotone" dataKey="won" stroke="#F59E0B" strokeWidth={3} name="Won" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Enhanced Status Distribution */}
        <ChartCard title="Lead Status Distribution" subtitle="Current pipeline breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={status_distribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percentage }) => `${status}: ${percentage}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="count"
              >
                {status_distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px' 
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Traffic Sources */}
        <ChartCard title="Traffic Sources Performance" subtitle="Lead generation by source">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top_sources} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="source" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px' 
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Lead Quality Radar */}
        <ChartCard title="Lead Quality Analysis" subtitle="Score distribution breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={lead_quality}>
              <RadialBar 
                minAngle={15} 
                label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }} 
                background 
                clockWise 
                dataKey="count" 
                fill="#8884d8"
              />
              {lead_quality.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Enhanced UTM Performance Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Campaign Performance</h3>
          <p className="mt-1 text-gray-600">Detailed UTM tracking and conversion metrics</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Source / Medium
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Campaigns
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Leads
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Quality Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {utm_performance.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{row.source}</div>
                        <div className="text-sm text-gray-500">{row.medium}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {row.campaigns.slice(0, 2).join(', ')}
                      {row.campaigns.length > 2 && (
                        <span className="ml-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{row.campaigns.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{row.total_leads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{row.won_leads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ConversionBadge rate={parseFloat(row.conversion_rate)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <QualityBadge score={parseFloat(row.avg_score)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Advanced Tab Component
function AdvancedTab({ data, period }) {
  if (data.error) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Advanced Analytics Loading</h3>
          <p className="mt-2 text-gray-600">Please ensure your database views are properly set up.</p>
        </div>
      </div>
    );
  }

  const { budget_analysis, quality_distribution, time_patterns, age_analysis } = data;

  return (
    <div className="space-y-8">
      {/* Budget Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ChartCard title="Budget Category Analysis" subtitle="Lead distribution by budget ranges">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budget_analysis}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="budget_category" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip contentStyle={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
              <Bar dataKey="lead_count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Lead Age Distribution" subtitle="How long leads have been in the system">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={age_analysis}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ age_range, percentage }) => `${age_range}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {age_analysis.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Time Patterns */}
      {time_patterns && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ChartCard title="Hourly Activity Patterns" subtitle="Lead generation by hour of day">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={time_patterns.hourly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="hour" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Daily Activity Patterns" subtitle="Lead generation by day of week">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={time_patterns.daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day_name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </div>
  );
}

// Real-time Tab Component
function RealTimeTab({ data, refreshing }) {
  const { metrics, today_metrics, recent_leads, last_updated } = data;

  return (
    <div className="space-y-8">
      {/* Real-time Status */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-3 h-3 rounded-full ${refreshing ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-green-800">Real-time Analytics</h3>
              <p className="text-green-700">Last updated: {new Date(last_updated).toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="text-green-600">
            {refreshing ? 'Updating...' : 'Live'}
          </div>
        </div>
      </div>

      {/* Today's Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <RealTimeCard
          title="Today's Leads"
          value={today_metrics.total_today}
          icon="📈"
          color="blue"
        />
        <RealTimeCard
          title="Avg Score Today"
          value={today_metrics.avg_score_today}
          icon="⭐"
          color="yellow"
        />
        <RealTimeCard
          title="New Leads"
          value={today_metrics.new_leads_today}
          icon="🆕"
          color="green"
        />
        <RealTimeCard
          title="Qualified"
          value={today_metrics.qualified_today}
          icon="✅"
          color="purple"
        />
        <RealTimeCard
          title="Pipeline Value"
          value={`₹${(today_metrics.pipeline_value_today || 0).toLocaleString()}`}
          icon="💰"
          color="emerald"
        />
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
          <p className="mt-1 text-gray-600">Latest lead submissions and updates</p>
        </div>
        <div className="divide-y divide-gray-200">
          {recent_leads.map((lead, index) => (
            <div key={lead.id} className="px-8 py-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {lead.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{lead.full_name}</h4>
                    <p className="text-sm text-gray-600">{new Date(lead.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <QualityBadge score={lead.lead_score} />
                  <StatusBadge status={lead.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Forecasting Tab Component
function ForecastingTab({ period }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const [revenueRes, velocityRes, scoringRes] = await Promise.all([
          fetch('/api/admin/analytics?type=forecast&months=6'),
          fetch('/api/admin/analytics?type=velocity'),
          fetch('/api/admin/analytics?type=scoring')
        ]);

        const [revenue, velocity, scoring] = await Promise.all([
          revenueRes.json(),
          velocityRes.json(),
          scoringRes.json()
        ]);

        setForecastData({ revenue, velocity, scoring });
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [period]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!forecastData) return null;

  const { revenue, velocity, scoring } = forecastData;

  return (
    <div className="space-y-8">
      {/* Revenue Forecast */}
      {revenue.forecast && (
        <ChartCard title="Revenue Forecast" subtitle="Projected revenue for next 6 months">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenue.forecast}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="forecast_month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Area type="monotone" dataKey="projected_revenue" stroke="#8B5CF6" fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Lead Velocity */}
        {velocity.velocity && (
          <ChartCard title="Lead Velocity Trends" subtitle="Time to conversion analysis">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={velocity.velocity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="period" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Line type="monotone" dataKey="velocity_score" stroke="#06B6D4" strokeWidth={2} />
                <Line type="monotone" dataKey="avg_time_to_qualify" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {/* Scoring Analysis */}
        {scoring.scoring_analysis && (
          <ChartCard title="Lead Scoring Performance" subtitle="Conversion by score ranges">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoring.scoring_analysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="score_range" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Bar dataKey="conversion_rate" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}
      </div>
    </div>
  );
}

// Reusable Components
function KPICard({ title, value, subtitle, icon, color, trend, trendDirection }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className={`bg-gradient-to-r ${colorClasses[color]} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm opacity-75">{subtitle}</p>
          </div>
          <div className="text-4xl opacity-80">{icon}</div>
        </div>
      </div>
      {trend && (
        <div className="px-6 py-3 bg-gray-50">
          <div className={`flex items-center text-sm ${
            trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <svg className={`w-4 h-4 mr-1 ${trendDirection === 'up' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
            <span className="font-semibold">{trend}</span>
            <span className="ml-1 text-gray-500">vs last period</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}

function RealTimeCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    emerald: 'bg-emerald-100 text-emerald-600',
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <span className="text-xl">{icon}</span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ConversionBadge({ rate }) {
  const getColor = () => {
    if (rate >= 15) return 'bg-green-100 text-green-800 border-green-200';
    if (rate >= 8) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getColor()}`}>
      {rate.toFixed(1)}%
    </span>
  );
}

function QualityBadge({ score }) {
  const getColor = () => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getColor()}`}>
      {score.toFixed(0)}
    </span>
  );
}

function StatusBadge({ status }) {
  const statusStyles = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    qualified: 'bg-green-100 text-green-800 border-green-200',
    won: 'bg-purple-100 text-purple-800 border-purple-200',
    lost: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {status}
    </span>
  );
}