import React, { useState } from 'react';
import { Radar, Target, Zap, Users, TrendingUp, Brain, Shield, Clock, Award, CheckCircle, ArrowRight } from 'lucide-react';

const HSERAbout = () => {
  const [isDark, setIsDark] = useState(true);

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Skill-Level Analysis",
      description: "Unlike traditional job market tools, HSER focuses on granular skill-level predictions, providing actionable insights for individuals and organizations."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Explainable AI",
      description: "Every prediction comes with clear explanations. No black boxes - understand exactly why a skill is at risk and what's driving the change."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Half-Life Calculations",
      description: "Quantify skill relevance decay with our proprietary half-life metric, helping you plan reskilling timelines effectively."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Protection Scoring",
      description: "Measure how well human creativity and judgment protect skills from automation, identifying future-proof career paths."
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Data Collection",
      description: "We analyze 50+ software and IT skills using four core attributes: automation level, creativity requirement, tool growth speed, and adoption velocity."
    },
    {
      step: "02",
      title: "Mathematical Modeling",
      description: "Our transparent algorithms calculate Replacement Force Score (RFS), Protection Score (PS), and Extinction Risk percentage using validated formulas."
    },
    {
      step: "03",
      title: "Trend Analysis",
      description: "We track AI tool development, industry adoption rates, and technological advancement to project skill half-life and decline trajectories."
    },
    {
      step: "04",
      title: "Explainable Insights",
      description: "Every metric is translated into human-readable explanations covering why, how, and when skills face extinction risk."
    }
  ];

  const useCases = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Universities",
      points: [
        "Design future-proof curriculum",
        "Align programs with industry needs",
        "Prioritize emerging skill development",
        "Reduce graduate unemployment"
      ]
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Corporates",
      points: [
        "Strategic workforce planning",
        "Targeted reskilling programs",
        "Talent acquisition insights",
        "ROI on training investments"
      ]
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Government",
      points: [
        "Education policy development",
        "Labor market forecasting",
        "Economic planning",
        "National competitiveness strategy"
      ]
    }
  ];

  const team = [
    {
      name: "Vivek Chaurasiya",
      role: "Founder & Lead Developer",
      description: "BTech CSE Student | AI/ML & Data Science Enthusiast"
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Radar className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>HSER</span>
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-cyan-500' : 'bg-cyan-300'} -top-48 -left-48 animate-pulse`}></div>
          <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-purple-500' : 'bg-purple-300'} -bottom-48 -right-48 animate-pulse`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              About <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">HSER</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              The world's first skill-level extinction radar for software and IT professionals
            </p>
          </div>

          {/* Mission Statement */}
          <div className={`p-8 rounded-3xl ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-16`}>
            <div className="flex items-start space-x-4">
              <Zap className="w-12 h-12 text-cyan-400 flex-shrink-0" />
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Mission</h2>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  In an era of rapid technological change, professionals need more than job market data—they need skill-level intelligence. 
                  HSER was built to bridge this gap, providing universities, corporations, and governments with predictive insights about 
                  which technical skills face extinction and why. By focusing on skills rather than jobs, we enable proactive decision-making 
                  for curriculum design, workforce planning, and policy development. Our transparent, explainable approach ensures stakeholders 
                  understand not just what will change, but why and when it will happen.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-20">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why HSER is Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:border-cyan-500 transition-all`}>
                  <div className="text-cyan-400 mb-4">{feature.icon}</div>
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-20">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our Methodology
            </h2>
            <div className="space-y-6">
              {methodology.map((item, idx) => (
                <div key={idx} className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-start space-x-6">
                    <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                      <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mathematical Foundation */}
          <div className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-20`}>
            <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Core Formulas
            </h2>
            <div className="space-y-6">
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className="text-cyan-400 font-semibold mb-2">Replacement Force Score (RFS)</h4>
                <code className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  RFS = (Automation Level + Tool Growth Speed + Adoption Velocity) ÷ 3
                </code>
              </div>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className="text-cyan-400 font-semibold mb-2">Protection Score (PS)</h4>
                <code className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  PS = Human Creativity Requirement
                </code>
              </div>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className="text-cyan-400 font-semibold mb-2">Skill Extinction Risk (%)</h4>
                <code className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Extinction Risk = RFS × (1 − PS) × 100
                </code>
              </div>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className="text-cyan-400 font-semibold mb-2">Skill Half-Life (years)</h4>
                <code className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Half-Life = 5 ÷ Tool Growth Speed
                </code>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-20">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Who Benefits from HSER?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, idx) => (
                <div key={idx} className={`p-8 rounded-2xl ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="text-cyan-400 mb-6">{useCase.icon}</div>
                  <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{useCase.title}</h3>
                  <ul className="space-y-3">
                    {useCase.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              The Team
            </h2>
            <div className="flex justify-center">
              {team.map((member, idx) => (
                <div key={idx} className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} max-w-md text-center`}>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                  <p className="text-cyan-400 font-semibold mb-4">{member.role}</p>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{member.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className={`p-8 rounded-3xl ${isDark ? 'bg-gradient-to-br from-cyan-900/30 to-purple-900/30' : 'bg-gradient-to-br from-cyan-50 to-purple-50'} border ${isDark ? 'border-cyan-800' : 'border-cyan-200'} text-center`}>
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Ready to Future-Proof Your Skills Strategy?
            </h2>
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Join leading organizations using HSER for strategic workforce planning
            </p>
            <button className="group bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all inline-flex items-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSERAbout;
