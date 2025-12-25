import React, { useState, useMemo } from 'react';
import { Radar, Search, Filter, TrendingDown, TrendingUp, AlertTriangle, Shield, Clock, BarChart3, ArrowUpDown, ChevronRight } from 'lucide-react';

const HSERSkillExplorer = () => {
  const [isDark, setIsDark] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('risk-desc');

  // Skill data with calculated attributes
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

  // Calculate metrics for each skill
  const skillsWithMetrics = useMemo(() => {
    return skillsData.map(skill => {
      const rfs = (skill.automation + skill.toolGrowth + skill.adoption) / 3;
      const ps = skill.creativity;
      const extinctionRisk = rfs * (1 - ps) * 100;
      const halfLife = 5 / skill.toolGrowth;
      
      return {
        ...skill,
        rfs,
        ps,
        extinctionRisk: Math.round(extinctionRisk),
        halfLife: halfLife.toFixed(1),
        riskLevel: extinctionRisk >= 70 ? 'critical' : extinctionRisk >= 50 ? 'high' : extinctionRisk >= 30 ? 'medium' : 'low'
      };
    });
  }, []);

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    let filtered = skillsWithMetrics.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || skill.category === selectedCategory)
    );

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'risk-desc': return b.extinctionRisk - a.extinctionRisk;
        case 'risk-asc': return a.extinctionRisk - b.extinctionRisk;
        case 'halflife-desc': return parseFloat(b.halfLife) - parseFloat(a.halfLife);
        case 'halflife-asc': return parseFloat(a.halfLife) - parseFloat(b.halfLife);
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    return filtered;
  }, [skillsWithMetrics, searchTerm, selectedCategory, sortBy]);

  const categories = ['all', ...new Set(skillsData.map(s => s.category))];

  const getRiskColor = (level) => {
    switch(level) {
      case 'critical': return isDark ? 'text-red-400 bg-red-500/20' : 'text-red-600 bg-red-100';
      case 'high': return isDark ? 'text-orange-400 bg-orange-500/20' : 'text-orange-600 bg-orange-100';
      case 'medium': return isDark ? 'text-yellow-400 bg-yellow-500/20' : 'text-yellow-600 bg-yellow-100';
      case 'low': return isDark ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-100';
      default: return '';
    }
  };

  const getRiskIcon = (level) => {
    switch(level) {
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <TrendingDown className="w-5 h-5" />;
      case 'medium': return <BarChart3 className="w-5 h-5" />;
      case 'low': return <Shield className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Radar className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Skill Explorer</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Analyze extinction risk for {filteredSkills.length} skills</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all">
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Critical Risk</span>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-red-400">
              {skillsWithMetrics.filter(s => s.riskLevel === 'critical').length}
            </div>
          </div>

          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>High Risk</span>
              <TrendingDown className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-orange-400">
              {skillsWithMetrics.filter(s => s.riskLevel === 'high').length}
            </div>
          </div>

          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Medium Risk</span>
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-yellow-400">
              {skillsWithMetrics.filter(s => s.riskLevel === 'medium').length}
            </div>
          </div>

          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Low Risk</span>
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-green-400">
              {skillsWithMetrics.filter(s => s.riskLevel === 'low').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-gray-900 border-gray-700 text-white focus:border-cyan-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                } focus:outline-none`}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-gray-900 border-gray-700 text-white focus:border-cyan-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                } focus:outline-none appearance-none`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-gray-900 border-gray-700 text-white focus:border-cyan-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                } focus:outline-none appearance-none`}
              >
                <option value="risk-desc">Highest Risk First</option>
                <option value="risk-asc">Lowest Risk First</option>
                <option value="halflife-desc">Longest Half-Life First</option>
                <option value="halflife-asc">Shortest Half-Life First</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Skills Table */}
        <div className={`rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDark ? 'bg-gray-900' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Skill Name</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Category</th>
                  <th className={`px-6 py-4 text-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Risk Level</th>
                  <th className={`px-6 py-4 text-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Extinction Risk</th>
                  <th className={`px-6 py-4 text-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Half-Life</th>
                  <th className={`px-6 py-4 text-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Protection</th>
                  <th className={`px-6 py-4 text-right text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredSkills.map((skill) => (
                  <tr key={skill.id} className={`hover:${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} transition-colors cursor-pointer`}>
                    <td className={`px-6 py-4 ${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                      {skill.name}
                    </td>
                    <td className={`px-6 py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {skill.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(skill.riskLevel)}`}>
                          {getRiskIcon(skill.riskLevel)}
                          <span className="uppercase">{skill.riskLevel}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`text-2xl font-bold ${
                          skill.extinctionRisk >= 70 ? 'text-red-400' :
                          skill.extinctionRisk >= 50 ? 'text-orange-400' :
                          skill.extinctionRisk >= 30 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {skill.extinctionRisk}%
                        </span>
                        <div className="w-20 h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              skill.extinctionRisk >= 70 ? 'bg-red-500' :
                              skill.extinctionRisk >= 50 ? 'bg-orange-500' :
                              skill.extinctionRisk >= 30 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${skill.extinctionRisk}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-center ${isDark ? 'text-cyan-400' : 'text-cyan-600'} font-semibold`}>
                      <div className="flex items-center justify-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{skill.halfLife} yrs</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                          skill.ps >= 0.7 ? 'border-green-500 text-green-400' :
                          skill.ps >= 0.5 ? 'border-yellow-500 text-yellow-400' : 'border-red-500 text-red-400'
                        }`}>
                          <span className="text-sm font-bold">{Math.round(skill.ps * 100)}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSERSkillExplorer;
