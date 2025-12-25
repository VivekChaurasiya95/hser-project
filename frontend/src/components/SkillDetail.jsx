import React, { useState } from 'react';
import { Radar, ArrowLeft, AlertTriangle, Clock, Shield, TrendingDown, Zap, Brain, Bot, Users, CheckCircle, XCircle, Activity, Target } from 'lucide-react';

const HSERSkillDetail = () => {
  const [isDark, setIsDark] = useState(true);

  // Sample skill data - in real app, this would come from props or API
  const skill = {
    id: 3,
    name: 'Manual Software Testing',
    category: 'QA',
    automation: 0.9,
    creativity: 0.15,
    toolGrowth: 0.95,
    adoption: 0.85
  };

  // Calculate metrics
  const rfs = (skill.automation + skill.toolGrowth + skill.adoption) / 3;
  const ps = skill.creativity;
  const extinctionRisk = Math.round(rfs * (1 - ps) * 100);
  const halfLife = (5 / skill.toolGrowth).toFixed(1);
  const riskLevel = extinctionRisk >= 70 ? 'critical' : extinctionRisk >= 50 ? 'high' : extinctionRisk >= 30 ? 'medium' : 'low';

  // Explanation generation
  const getExplanation = () => {
    const reasons = [];
    
    if (skill.automation > 0.7) {
      reasons.push('High automation capability means most tasks can be performed by tools');
    }
    if (skill.toolGrowth > 0.8) {
      reasons.push('Rapid growth in AI testing tools and frameworks');
    }
    if (skill.adoption > 0.7) {
      reasons.push('Fast industry adoption of automated testing solutions');
    }
    if (skill.creativity < 0.3) {
      reasons.push('Low creative requirement makes it easier to automate');
    }

    return {
      why: `This skill is at ${riskLevel} extinction risk because ${reasons.join(', ')}.`,
      how: `AI-powered testing tools, continuous integration systems, and automated QA platforms are rapidly replacing manual testing workflows. Tools like Selenium, Cypress, TestCafe, and AI-driven test generators can now handle test case creation, execution, and reporting with minimal human intervention.`,
      when: `Based on current trends, this skill is expected to decline significantly within ${halfLife} years. Organizations are increasingly investing in automated testing infrastructure, reducing demand for manual testing roles.`,
      alternatives: [
        'Test Automation Engineering',
        'AI-Driven Test Strategy',
        'Performance & Security Testing',
        'DevOps & CI/CD Pipeline Management'
      ]
    };
  };

  const explanation = getExplanation();

  const replacementFactors = [
    { name: 'AI Testing Tools', impact: 95, icon: <Bot className="w-5 h-5" /> },
    { name: 'Automation Platforms', impact: 90, icon: <Zap className="w-5 h-5" /> },
    { name: 'CI/CD Integration', impact: 85, icon: <Activity className="w-5 h-5" /> },
    { name: 'No-Code Test Builders', impact: 80, icon: <Target className="w-5 h-5" /> }
  ];

  const timelineEvents = [
    { year: '2020', event: 'Basic automation tools emerge', status: 'past' },
    { year: '2022', event: 'AI-powered test generation', status: 'past' },
    { year: '2024', event: 'Major enterprise adoption', status: 'current' },
    { year: '2026', event: '80% automation expected', status: 'future' },
    { year: '2030', event: 'Near-complete automation', status: 'future' }
  ];

  const getRiskColor = () => {
    switch(riskLevel) {
      case 'critical': return 'from-red-500 to-red-700';
      case 'high': return 'from-orange-500 to-orange-700';
      case 'medium': return 'from-yellow-500 to-yellow-700';
      case 'low': return 'from-green-500 to-green-700';
      default: return '';
    }
  };

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
            <div className="flex items-center space-x-3">
              <button className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} font-semibold`}>
                Compare
              </button>
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold">
                Export Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className={`p-8 rounded-3xl mb-8 relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                  {skill.category}
                </span>
                <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {skill.name}
                </h1>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Comprehensive extinction risk analysis
                </p>
              </div>
              <div className={`w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br ${getRiskColor()} shadow-2xl`}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">{extinctionRisk}%</div>
                  <div className="text-xs text-white/80 uppercase tracking-wider">{riskLevel}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Skill Half-Life</span>
                </div>
                <div className="text-3xl font-bold text-cyan-400">{halfLife} years</div>
              </div>

              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Protection Score</span>
                </div>
                <div className="text-3xl font-bold text-green-400">{Math.round(ps * 100)}%</div>
              </div>

              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Automation Level</span>
                </div>
                <div className="text-3xl font-bold text-purple-400">{Math.round(skill.automation * 100)}%</div>
              </div>

              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-orange-400" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Replacement Force</span>
                </div>
                <div className="text-3xl font-bold text-orange-400">{Math.round(rfs * 100)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* WHY Section */}
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <AlertTriangle className="w-6 h-6 mr-2 text-red-400" />
              Why is this skill at risk?
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {explanation.why}
            </p>
          </div>

          {/* HOW Section */}
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Zap className="w-6 h-6 mr-2 text-yellow-400" />
              How is it being replaced?
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {explanation.how}
            </p>
          </div>

          {/* WHEN Section */}
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Clock className="w-6 h-6 mr-2 text-cyan-400" />
              When will it decline?
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {explanation.when}
            </p>
          </div>

          {/* Alternatives Section */}
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Target className="w-6 h-6 mr-2 text-green-400" />
              Alternative Skills
            </h2>
            <div className="space-y-3">
              {explanation.alternatives.map((alt, idx) => (
                <div key={idx} className={`flex items-center space-x-3 p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{alt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Replacement Factors */}
        <div className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Key Replacement Factors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {replacementFactors.map((factor, idx) => (
              <div key={idx} className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600">
                      {factor.icon}
                    </div>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{factor.name}</span>
                  </div>
                  <span className="text-xl font-bold text-cyan-400">{factor.impact}%</span>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: `${factor.impact}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Extinction Timeline
          </h2>
          <div className="relative">
            <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <div className="space-y-6">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative flex items-start space-x-4">
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                    event.status === 'past' ? 'bg-gray-600' :
                    event.status === 'current' ? 'bg-gradient-to-r from-cyan-500 to-purple-600' :
                    'bg-gray-700 border-2 border-cyan-500'
                  }`}>
                    {event.status === 'past' ? <CheckCircle className="w-6 h-6 text-white" /> :
                     event.status === 'current' ? <Activity className="w-6 h-6 text-white animate-pulse" /> :
                     <Clock className="w-6 h-6 text-cyan-400" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className={`text-xl font-bold mb-1 ${
                      event.status === 'current' ? 'text-cyan-400' : isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event.year}
                      {event.status === 'current' && (
                        <span className="ml-2 text-sm font-normal text-cyan-400">(Current)</span>
                      )}
                    </div>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSERSkillDetail;
