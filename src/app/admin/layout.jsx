'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthGuard, useAuth } from '@/lib/auth';

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <AdminDashboardLayout>{children}</AdminDashboardLayout>
    </AuthGuard>
  );
}

function AdminDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: '🏠',
      description: 'Overview & KPIs',
      badge: null,
    },
    {
      name: 'Leads',
      href: '/admin/leads',
      icon: '👥',
      description: 'Manage prospects',
      badge: null,
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: '📊',
      description: 'Performance insights',
      badge: 'NEW',
    },
    {
      name: 'Careers',
      href: '/admin/careers',
      icon: '💼',
      description: 'Job applications',
      badge: null,
    },
  ];

  const quickActions = [
    { name: 'New Lead', icon: '➕', action: () => window.open('/admin/leads', '_blank') },
    { name: 'Export Data', icon: '📥', action: () => window.open('/api/admin/export?type=leads&format=xlsx', '_blank') },
    { name: 'Analytics', icon: '📈', action: () => window.open('/admin/analytics', '_blank') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" 
            onClick={() => setSidebarOpen(false)} 
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white/95 backdrop-blur-xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50"
                onClick={() => setSidebarOpen(false)}
              >
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <EnhancedSidebarContent navigation={navigation} pathname={pathname} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <EnhancedSidebarContent navigation={navigation} pathname={pathname} />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Enhanced Top Navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-20 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  StackBinary™ Admin
                </h1>
                <p className="text-sm text-gray-500">Lead Management Dashboard</p>
              </div>
            </div>

            {/* Quick Actions & User Menu */}
            <div className="flex items-center space-x-4">
              {/* Home/Website Button */}
              <a
                href="/"
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                title="Go to main website"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-semibold">Website</span>
              </a>

              {/* Quick Actions */}
              <div className="hidden md:flex items-center space-x-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
                    title={action.name}
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="hidden xl:inline">{action.name}</span>
                  </button>
                ))}
              </div>

              {/* Time Display */}
              <div className="hidden md:block text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-xs text-gray-500">
                  {currentTime.toLocaleDateString()}
                </div>
              </div>

              {/* User Menu with Logout */}
              <div className="flex items-center space-x-3">
                {/* User Profile */}
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xs font-semibold text-gray-900">Admin</div>
                    <div className="text-xs text-gray-500">{user?.email || 'admin@stackbinary.com'}</div>
                  </div>
                </div>
                
                {/* Logout Button */}
                <button
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={signOut}
                  title="Sign out"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Page content */}
        <main className="flex-1 relative">
          <div className="py-8">
            <div className={pathname === '/admin/leads' ? 'w-full px-4 sm:px-6 lg:px-8' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function EnhancedSidebarContent({ navigation, pathname }) {
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Fetch some basic stats for the sidebar
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        const data = await response.json();
        setStats({
          totalLeads: data.summary?.leads?.total || 0,
          newLeads: data.summary?.leads?.new || 0,
          conversionRate: data.summary?.conversion_rates?.overall_conversion || 0,
        });
      } catch (error) {
        console.error('Failed to fetch sidebar stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-2xl border-r border-gray-200/50">
      {/* Enhanced Logo Section */}
      <div className="flex-shrink-0 px-6 py-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🚀</span>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-gray-900">StackBinary™</h2>
            <p className="text-sm text-gray-500">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Leads</span>
              <span className="text-sm font-bold text-blue-600">{stats.totalLeads}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Today</span>
              <span className="text-sm font-bold text-green-600">{stats.newLeads}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Conv. Rate</span>
              <span className="text-sm font-bold text-purple-600">{stats.conversionRate}%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Navigation
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex items-center px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:bg-white hover:shadow-md hover:scale-102'
              }`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                isActive 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'bg-gray-100 group-hover:bg-gray-200'
              }`}>
                <span className="text-xl">{item.icon}</span>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className={`text-xs mt-1 ${
                  isActive ? 'text-white/75' : 'text-gray-500'
                }`}>
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}