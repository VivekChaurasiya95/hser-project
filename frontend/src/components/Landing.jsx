import React, { useState, useEffect } from 'react';
import { Radar, TrendingDown, Shield, Clock, Brain, Users, Building2, GraduationCap, ChevronRight, Menu, X, Moon, Sun, BarChart3, Zap, Target } from 'lucide-react';

const HSERLanding = ({ isDark, onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Radar className="w-8 h-8" />,
      title: "Skill Extinction Risk",
      description: "Predict which software & IT skills are at risk of becoming obsolete"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Skill Half-Life",
      description: "Calculate how long skills remain relevant in the market"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Protection Score",
      description: "Measure human creativity requirement for each skill"
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Replacement Force",
      description: "Track automation and AI adoption velocity"
    }
  ];

  const targetUsers = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Universities",
      description: "Optimize curriculum planning based on skill longevity data"
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: "Corporates",
      description: "Strategic reskilling and workforce transformation planning"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Government",
      description: "Workforce and education policy development"
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-cyan-500' : 'bg-cyan-300'} -top-48 -left-48 animate-pulse`}></div>
          <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-purple-500' : 'bg-purple-300'} -bottom-48 -right-48 animate-pulse`}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
              isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
            } backdrop-blur-sm mb-6`}>
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Welcome to the future of skill intelligence</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>Track the </span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Extinction
              </span>
              <br />
              <span className={isDark ? 'text-white' : 'text-gray-900'}>of </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Human Skills
              </span>
            </h1>

            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              HSER predicts which software & IT skills are becoming obsolete, how fast they're declining, and why they're being replaced by AI and automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
               onClick={() => onNavigate('explorer')}
               className="group bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center space-x-2"
               >     
                <span>Explore Skills</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => onNavigate('about')}
                className={`px-8 py-4 rounded-full text-lg font-semibold border-2 transition-all ${
                  isDark 
                    ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900' 
                    : 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white'
                }`}
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">50+</div>
                <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Software & IT Skills Tracked</div>
              </div>
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">4+</div>
                <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Core Metrics Calculated</div>
              </div>
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">100%</div>
                <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Explainable AI Logic</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 ${isDark ? 'bg-gray-800/30' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Core Features
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Powerful metrics to predict skill extinction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                } border hover:border-cyan-500 transition-all group cursor-pointer`}
              >
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Who Uses HSER?
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Empowering decision-makers across sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetUsers.map((user, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl ${
                  isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'
                } border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:shadow-2xl hover:shadow-cyan-500/20 transition-all`}
              >
                <div className="text-cyan-400 mb-6">
                  {user.icon}
                </div>
                <h3 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user.title}
                </h3>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 ${isDark ? 'bg-gray-800/30' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to Future-Proof Your Workforce?
          </h2>
          <p className={`text-xl mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Join leading organizations using HSER to stay ahead of skill extinction
          </p>
          <button 
            onClick={() => onNavigate('auth')}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default HSERLanding;
