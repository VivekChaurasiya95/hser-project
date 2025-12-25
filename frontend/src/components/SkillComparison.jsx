import React, { useState, useMemo } from 'react';
import { Radar, ArrowLeft, GitCompare, TrendingDown, Clock, Shield, Bot, Brain, Zap, Activity, ChevronDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HSERSkillComparison = () => {
  const [isDark, setIsDark] = useState(true);

  const skillsData = [
    { id: 1, name: 'Manual SQL Reporting', category: 'Data', automation: 0.85, creativity: 0.2, toolGrowth: 0.9, adoption: 0.8 },
    { id: 2, name: 'CRUD Backend Development', category: 'Development', automation: 0.7, creativity: 0.3, toolGrowth: 0.85, adoption: 0.75 },
    { id: 3, name: 'Manual Software Testing', category: 'QA', automation: 0.9, creativity: 0.15, toolGrowth: 0.95, adoption: 0.85 },
    { id: 4, name: 'Excel Dashboarding', category: 'Analytics', automation: 0.8, creativity: 0.25, toolGrowth: 0.8, adoption: 0.7 },
    { id: 5, name: 'Frontend UI Coding (Basic)', category: 'Development', automation: 0.65, creativity: 0.4, toolGrowth: 0.75, adoption: 0.6 },
    { id: 6, name: 'Prompt Engineering', category: 'AI', automation: 0.3, creativity: 0.8, toolGrowth: 0.95, adoption: 0.7 },
    { id: 7, name: 'Data Labeling', category: 'Data', automation: 0.75, creativity: 0.2, toolGrowth: 0.85, adoption: 0.7 },
    { id: 8, name: 'API Integration', category: 'Development', automation: 0.6, creativity: 0.35, toolGrowth: 0.7, adoption: 0.65 },
    { id: 9, name: 'DevOps Automation', category: 'Operations', automation: 0.5, creativity: 0.5, toolGrowth: 0.8, adoption: 0.75 },
    { id: 10, name: 'System Debugging', category: 'Development', automation: 0.4, creativity: 0.7, toolGrowth: 0.6, adoption: 0.5 },
    { id: 11, name: 'Code Refactoring', category: 'Development', automation: 0.55, creativity: 0.6, toolGrowth: 0.65, adoption: 0.55 },
    { id: 12, name: 'ETL Data Pipelines', category: 'Data', automation: 0.7, creativity: 0.3, toolGrowth: 0.75, adoption: 0.7 },
    { id: 13, name: 'Cloud Infrastructure Setup', category: 'Operations', automation: 0.6, creativity: 0.4, toolGrowth: 0.8, adoption: 0.75 },
    { id: 14, name: 'Technical Documentation Writing', category: 'Documentation', automation: 0.5, creativity: 0.6, toolGrowth: 0.7, adoption: 0.6 },
    { id: 15, name: 'UI/UX Prototyping', category: 'Design', automation: 0.45, creativity: 0.75, toolGrowth: 0.65, adoption: 0.6 },
    { id: 16, name: 'Cybersecurity Monitoring', category: 'Security', automation: 0.65, creativity: 0.4, toolGrowth: 0.75, adoption: 0.7 },
    { id: 17, name: 'Database Administration', category: 'Data', automation: 0.6, creativity: 0.35, toolGrowth: 0.7, adoption: 0.65 },
    { id: 18, name: 'Machine Learning Model Training', category: 'AI', automation: 0.5, creativity: 0.7, toolGrowth: 0.85, adoption: 0.75 },
    { id: 19, name: 'Model Deployment (MLOps)', category: 'AI', automation: 0.55, creativity: 0.5, toolGrowth: 0.8, adoption: 0.7 },
    { id: 20, name: 'Low-Code / No-Code Development', category: 'Development', automation: 0.8, creativity: 0.3, toolGrowth: 0.9, adoption: 0.85 },
    { id: 21, name: 'Software Architecture Design', category: 'Development', automation: 0.3, creativity: 0.85, toolGrowth: 0.5, adoption: 0.4},
    { id: 22, name: 'Performance Optimization', category: 'Development', automation: 0.45, creativity: 0.65, toolGrowth: 0.6, adoption: 0.55},
    { id: 23, name: 'Code Review & Quality Assurance', category: 'QA', automation: 0.6, creativity: 0.5, toolGrowth: 0.75, adoption: 0.7},
    { id: 24, name: 'Legacy System Maintenance', category: 'Operations', automation: 0.4, creativity: 0.55, toolGrowth: 0.5, adoption: 0.45},
    { id: 25, name: 'Technical Support Engineering', category: 'Support', automation: 0.7, creativity: 0.35, toolGrowth: 0.8, adoption: 0.75},
    { id: 26, name: 'Scripting & Automation', category: 'Development', automation: 0.65, creativity: 0.45, toolGrowth: 0.7, adoption: 0.65},
    { id: 27, name: 'Data Visualization Engineering', category: 'Analytics', automation: 0.5, creativity: 0.6, toolGrowth: 0.65, adoption: 0.6},
    { id: 28, name: 'Requirements Engineering', category: 'Documentation', automation: 0.4, creativity: 0.7, toolGrowth: 0.55, adoption: 0.5},
    { id: 29, name: 'Software Estimation & Effort Planning', category: 'Management', automation: 0.55, creativity: 0.5, toolGrowth: 0.6, adoption: 0.55},
    { id: 30, name: 'Version Control Management (Git Operations)', category: 'Development', automation: 0.7, creativity: 0.25, toolGrowth: 0.75, adoption: 0.8},
    { id: 31, name: 'Build & Release Management', category: 'Operations', automation: 0.75, creativity: 0.3, toolGrowth: 0.85, adoption: 0.8},
    { id: 32, name: 'Configuration Management', category: 'Operations', automation: 0.7, creativity: 0.35, toolGrowth: 0.8, adoption: 0.75},
    { id: 33, name: 'Distributed Systems Engineering', category: 'Development', automation: 0.35, creativity: 0.8, toolGrowth: 0.55, adoption: 0.5},
    { id: 34, name: 'Event-Driven Architecture Design', category: 'Development', automation: 0.4, creativity: 0.75, toolGrowth: 0.6, adoption: 0.55},
    { id: 35, name: 'Message Queue Management (Kafka/RabbitMQ)', category: 'Operations', automation: 0.55, creativity: 0.45, toolGrowth: 0.7, adoption: 0.65},
    { id: 36, name: 'System Reliability Engineering (SRE)', category: 'Operations', automation: 0.5, creativity: 0.6, toolGrowth: 0.7, adoption: 0.65},
    { id: 37, name: 'Fault Tolerance Engineering', category: 'Development', automation: 0.45, creativity: 0.7, toolGrowth: 0.65, adoption: 0.6},
    { id: 38, name: 'Data Cleaning & Preprocessing', category: 'Data', automation: 0.8, creativity: 0.25, toolGrowth: 0.85, adoption: 0.8},
    { id: 39, name: 'Feature Engineering', category: 'AI', automation: 0.6, creativity: 0.55, toolGrowth: 0.75, adoption: 0.7},
    { id: 40, name: 'Data Quality Assurance', category: 'Data', automation: 0.7, creativity: 0.35, toolGrowth: 0.8, adoption: 0.75},
    { id: 41, name: 'Business Intelligence Report Development', category: 'Analytics', automation: 0.75, creativity: 0.3, toolGrowth: 0.8, adoption: 0.75},
    { id: 42, name: 'Data Governance & Compliance', category: 'Data', automation: 0.5, creativity: 0.6, toolGrowth: 0.65, adoption: 0.6},
    { id: 43, name: 'Identity & Access Management (IAM)', category: 'Security', automation: 0.6, creativity: 0.4, toolGrowth: 0.7, adoption: 0.65},
    { id: 44, name: 'Vulnerability Assessment & Penetration Testing', category: 'Security', automation: 0.55, creativity: 0.6, toolGrowth: 0.7, adoption: 0.65},
    { id: 45, name: 'Network Configuration & Monitoring', category: 'Operations', automation: 0.65, creativity: 0.35, toolGrowth: 0.75, adoption: 0.7},
    { id: 46, name: 'Incident Response Engineering', category: 'Security', automation: 0.5, creativity: 0.65, toolGrowth: 0.7, adoption: 0.65},
    { id: 47, name: 'Backup & Disaster Recovery Planning', category: 'Operations', automation: 0.6, creativity: 0.45, toolGrowth: 0.7, adoption: 0.65},
    { id: 48, name: 'Product Requirement Documentation (PRD Writing)', category: 'Documentation', automation: 0.55, creativity: 0.6, toolGrowth: 0.65, adoption: 0.6},
    { id: 49, name: 'Platform Integration Engineering', category: 'Development', automation: 0.65, creativity: 0.4, toolGrowth: 0.75, adoption: 0.7},
    { id: 50, name: 'Customer Success Engineering', category: 'Support', automation: 0.5, creativity: 0.7, toolGrowth: 0.65, adoption: 0.6}
  ];

  const [skill1, setSkill1] = useState(skillsData[2]);
  const [skill2, setSkill2] = useState(skillsData[3]);

  const calculateMetrics = (skill) => {
    const rfs = (skill.automation + skill.toolGrowth + skill.adoption) / 3;
    const ps = skill.creativity;
    const extinctionRisk = Math.round(rfs * (1 - ps) * 100);
    const halfLife = (5 / skill.toolGrowth).toFixed(1);
    return { rfs, ps, extinctionRisk, halfLife };
  };

  const metrics1 = calculateMetrics(skill1);
  const metrics2 = calculateMetrics(skill2);

  const attributeData = [
    {
      name: 'Automation',
      skill1Value: Math.round(skill1.automation * 100),
      skill2Value: Math.round(skill2.automation * 100)
    },
    {
      name: 'Creativity',
      skill1Value: Math.round(skill1.creativity * 100),
      skill2Value: Math.round(skill2.creativity * 100)
    },
    {
      name: 'Tool Growth',
      skill1Value: Math.round(skill1.toolGrowth * 100),
      skill2Value: Math.round(skill2.toolGrowth * 100)
    },
    {
      name: 'Adoption',
      skill1Value: Math.round(skill1.adoption * 100),
      skill2Value: Math.round(skill2.adoption * 100)
    }
  ];

  const timelineData = [
    { year: '2024', skill1: 100, skill2: 100 },
    { year: '2025', skill1: 85, skill2: 95 },
    { year: '2026', skill1: 65, skill2: 90 },
    { year: '2027', skill1: 45, skill2: 85 },
    { year: '2028', skill1: 30, skill2: 78 },
    { year: '2029', skill1: 20, skill2: 70 },
    { year: '2030', skill1: 10, skill2: 60 },
  ];

  const barData = [
    {
      metric: 'Extinction Risk',
      skill1Value: metrics1.extinctionRisk,
      skill2Value: metrics2.extinctionRisk,
    },
    {
      metric: 'Protection Score',
      skill1Value: Math.round(metrics1.ps * 100),
      skill2Value: Math.round(metrics2.ps * 100),
    },
    {
      metric: 'Replacement Force',
      skill1Value: Math.round(metrics1.rfs * 100),
      skill2Value: Math.round(metrics2.rfs * 100),
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'} transition-colors`}>
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Explorer</span>
            </button>
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold">
              Export Comparison
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <GitCompare className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Skill Comparison
            </h1>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Compare extinction risk metrics side by side
          </p>
        </div>

        {/* Skill Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Select First Skill
            </label>
            <div className="relative">
              <select
                value={skill1.id}
                onChange={(e) => setSkill1(skillsData.find(s => s.id === parseInt(e.target.value)))}
                className={`w-full px-4 py-4 rounded-xl border-2 transition-all appearance-none ${
                  isDark
                    ? 'bg-gray-900 border-gray-700 text-white focus:border-cyan-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                } focus:outline-none`}
              >
                {skillsData.map(skill => (
                  <option key={skill.id} value={skill.id}>{skill.name}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'} pointer-events-none`} />
            </div>
            <div className={`mt-4 px-3 py-1 rounded-full text-xs font-semibold inline-block ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-600'}`}>
              {skill1.category}
            </div>
          </div>

          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Select Second Skill
            </label>
            <div className="relative">
              <select
                value={skill2.id}
                onChange={(e) => setSkill2(skillsData.find(s => s.id === parseInt(e.target.value)))}
                className={`w-full px-4 py-4 rounded-xl border-2 transition-all appearance-none ${
                  isDark
                    ? 'bg-gray-900 border-gray-700 text-white focus:border-purple-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500'
                } focus:outline-none`}
              >
                {skillsData.map(skill => (
                  <option key={skill.id} value={skill.id}>{skill.name}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'} pointer-events-none`} />
            </div>
            <div className={`mt-4 px-3 py-1 rounded-full text-xs font-semibold inline-block ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
              {skill2.category}
            </div>
          </div>
        </div>

        {/* Key Metrics Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Extinction Risk</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">{metrics1.extinctionRisk}%</div>
                <div className="text-xs text-gray-500 truncate">{skill1.name}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">{metrics2.extinctionRisk}%</div>
                <div className="text-xs text-gray-500 truncate">{skill2.name}</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Half-Life</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">{metrics1.halfLife} yrs</div>
                <div className="text-xs text-gray-500 truncate">{skill1.name}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">{metrics2.halfLife} yrs</div>
                <div className="text-xs text-gray-500 truncate">{skill2.name}</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-green-400" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Protection Score</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">{Math.round(metrics1.ps * 100)}%</div>
                <div className="text-xs text-gray-500 truncate">{skill1.name}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">{Math.round(metrics2.ps * 100)}%</div>
                <div className="text-xs text-gray-500 truncate">{skill2.name}</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Replacement Force</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">{Math.round(metrics1.rfs * 100)}%</div>
                <div className="text-xs text-gray-500 truncate">{skill1.name}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">{Math.round(metrics2.rfs * 100)}%</div>
                <div className="text-xs text-gray-500 truncate">{skill2.name}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Attribute Comparison */}
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Attribute Comparison
            </h3>
            <div className="space-y-6">
              {attributeData.map((attr, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {attr.name}
                    </span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-semibold text-cyan-400">{attr.skill1Value}%</span>
                      <span className="text-sm font-semibold text-purple-400">{attr.skill2Value}%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`flex-1 h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                        style={{ width: `${attr.skill1Value}%` }}
                      />
                    </div>
                    <div className={`flex-1 h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${attr.skill2Value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-cyan-500"></div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{skill1.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-purple-500"></div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{skill2.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Core Metrics Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="metric" 
                  tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 11 }}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1f2937' : '#fff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: isDark ? '#fff' : '#000' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="skill1Value" name={skill1.name} fill="#06b6d4" radius={[8, 8, 0, 0]} />
                <Bar dataKey="skill2Value" name={skill2.name} fill="#a855f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Projected Relevance Timeline (2024-2030)
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="year" 
                tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
              />
              <YAxis 
                label={{ value: 'Relevance (%)', angle: -90, position: 'insideLeft', fill: isDark ? '#9ca3af' : '#6b7280' }}
                tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }}
                labelStyle={{ color: isDark ? '#fff' : '#000' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="skill1" 
                name={skill1.name}
                stroke="#06b6d4" 
                strokeWidth={3}
                dot={{ fill: '#06b6d4', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line 
                type="monotone" 
                dataKey="skill2" 
                name={skill2.name}
                stroke="#a855f7" 
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-gradient-to-br from-cyan-900/30 to-purple-900/30' : 'bg-gradient-to-br from-cyan-50 to-purple-50'} border ${isDark ? 'border-cyan-800' : 'border-cyan-200'}`}>
          <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Comparison Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
              <h4 className="font-semibold text-cyan-400 mb-2">Higher Risk Skill</h4>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                <strong>{metrics1.extinctionRisk > metrics2.extinctionRisk ? skill1.name : skill2.name}</strong> has a higher extinction risk at{' '}
                {Math.max(metrics1.extinctionRisk, metrics2.extinctionRisk)}%, primarily due to {
                  metrics1.extinctionRisk > metrics2.extinctionRisk 
                    ? (skill1.automation > 0.7 ? 'high automation potential' : 'rapid tool growth')
                    : (skill2.automation > 0.7 ? 'high automation potential' : 'rapid tool growth')
                }.
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
              <h4 className="font-semibold text-purple-400 mb-2">Better Protected Skill</h4>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                <strong>{metrics1.ps > metrics2.ps ? skill1.name : skill2.name}</strong> has stronger protection at{' '}
                {Math.round(Math.max(metrics1.ps, metrics2.ps) * 100)}%, thanks to higher creative requirements and human judgment needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSERSkillComparison;
