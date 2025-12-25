import React, { useState } from 'react';
import { Radar, User, TrendingDown, AlertTriangle, Clock, Shield, BarChart3, Activity, Bell, Settings, LogOut, Search, Filter, Bookmark, Eye, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HSERUserDashboard = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    name: "Vivek Chaurasiya",
    organization: "Madhav Institute of Technology and Science - Deemed University, Gwalior",
    skillsTracked: 12,
    alertsActive: 5,
    reportsGenerated: 8
  };

  const trackedSkills = [
    { id: 3, name: 'Manual Software Testing', risk: 81, change: -5 },
    { id: 1, name: 'Manual SQL Reporting', risk: 76, change: -3 },
    { id: 20, name: 'Low-Code Development', risk: 72, change: -4 },
    { id: 2, name: 'CRUD Backend Development', risk: 58, change: -2 },
    { id: 6, name: 'Prompt Engineering', risk: 25, change: +8 }
  ];

  const riskTrendData = [
    { month: 'Jul', critical: 2, high: 3, medium: 5, low: 2 },
    { month: 'Aug', critical: 3, high: 4, medium: 4, low: 1 },
    { month: 'Sep', critical: 3, high: 3, medium: 5, low: 1 },
    { month: 'Oct', critical: 4, high: 3, medium: 4, low: 1 },
    { month: 'Nov', critical: 4, high: 4, medium: 3, low: 1 },
    { month: 'Dec', critical: 5, high: 3, medium: 3, low: 1 }
  ];

  const categoryRiskData = [
    { name: 'Data', value: 68, color: '#ef4444' },
    { name: 'Development', value: 52, color: '#f97316' },
    { name: 'QA', value: 78, color: '#dc2626' },
    { name: 'Operations', value: 45, color: '#f59e0b' },
    { name: 'AI', value: 35, color: '#22c55e' }
  ];

  const timelineData = [
    { year: '2024', relevance: 100 },
    { year: '2025', relevance: 85 },
    { year: '2026', relevance: 68 },
    { year: '2027', relevance: 48 },
    { year: '2028', relevance: 32 },
    { year: '2029', relevance: 20 },
    { year: '2030', relevance: 10 }
  ];

  const recentAlerts = [
    {
      skill: "Manual Software Testing",
      message: "Risk increased by 5% this month",
      severity: "high",
      time: "2 hours ago"
    },
    {
      skill: "Excel Dashboarding",
      message: "New automation tool detected",
      severity: "medium",
      time: "5 hours ago"
    },
    {
      skill: "CRUD Backend Development",
      message: "Industry adoption accelerating",
      severity: "medium",
      time: "1 day ago"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'tracked', label: 'Tracked Skills', icon: <Bookmark className="w-5 h-5" /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <Activity className="w-5 h-5" /> }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Radar className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>HSER</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <Bell className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <Settings className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {userStats.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden md:block">
                  <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{userStats.name}</div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{userStats.organization}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gradient-to-br from-cyan-900/30 to-cyan-800/30' : 'bg-gradient-to-br from-cyan-50 to-cyan-100'} border ${isDark ? 'border-cyan-800' : 'border-cyan-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <Bookmark className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-cyan-400 mb-1">{userStats.skillsTracked}</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Skills Tracked</div>
          </div>

          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gradient-to-br from-red-900/30 to-red-800/30' : 'bg-gradient-to-br from-red-50 to-red-100'} border ${isDark ? 'border-red-800' : 'border-red-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-red-400 mb-1">{userStats.alertsActive}</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Alerts</div>
          </div>

          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30' : 'bg-gradient-to-br from-purple-50 to-purple-100'} border ${isDark ? 'border-purple-800' : 'border-purple-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">24</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Skills Analyzed</div>
          </div>

          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gradient-to-br from-green-900/30 to-green-800/30' : 'bg-gradient-to-br from-green-50 to-green-100'} border ${isDark ? 'border-green-800' : 'border-green-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <Download className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">{userStats.reportsGenerated}</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Reports Generated</div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex space-x-2 mb-8 overflow-x-auto ${isDark ? 'bg-gray-800' : 'bg-white'} p-1 rounded-xl`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Risk Trend Chart */}
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Risk Trend (Last 6 Months)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={riskTrendData}>
                  <defs>
                    <linearGradient id="critical" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="high" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="month" tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }} />
                  <YAxis tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#1f2937' : '#fff',
                      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fill="url(#critical)" />
                  <Area type="monotone" dataKey="high" stackId="1" stroke="#f97316" fill="url(#high)" />
                  <Area type="monotone" dataKey="medium" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="low" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Risk Distribution */}
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Risk by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryRiskData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryRiskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Alerts */}
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recent Alerts
                </h3>
                <div className="space-y-4">
                  {recentAlerts.map((alert, idx) => (
                    <div key={idx} className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className={`w-5 h-5 ${
                            alert.severity === 'high' ? 'text-red-400' : 'text-orange-400'
                          }`} />
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {alert.skill}
                          </span>
                        </div>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                          {alert.time}
                        </span>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {alert.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracked Skills Tab */}
        {activeTab === 'tracked' && (
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Your Tracked Skills
              </h3>
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold">
                Add Skill
              </button>
            </div>
            <div className="space-y-4">
              {trackedSkills.map(skill => (
                <div key={skill.id} className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} hover:border-cyan-500 border-2 border-transparent transition-all`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {skill.name}
                      </h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Risk:</span>
                          <span className={`text-2xl font-bold ${
                            skill.risk >= 70 ? 'text-red-400' :
                            skill.risk >= 50 ? 'text-orange-400' :
                            skill.risk >= 30 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {skill.risk}%
                          </span>
                        </div>
                        <div className={`flex items-center space-x-1 text-sm ${
                          skill.change > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          <TrendingDown className="w-4 h-4" />
                          <span>{skill.change}%</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-cyan-400 hover:text-cyan-300">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Projected Skill Relevance (2024-2030)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="year" tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }} />
                <YAxis tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1f2937' : '#fff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="relevance" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default HSERUserDashboard;
