import React, { useState } from 'react';
import { Radar, Mail, Lock, User, Eye, EyeOff, Chrome, ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';

const HSERAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organization: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleAuth = async () => {
    console.log('Initiating Google OAuth...');
    alert('Google Authentication would be integrated here with OAuth 2.0');
  };

  const handleSubmit = async () => {
    console.log('Form submitted:', { ...formData, userType, isLogin });
    alert(`${isLogin ? 'Login' : 'Signup'} successful! Redirecting to dashboard...`);
  };

  const features = [
    "50+ Software & IT Skills Tracked",
    "Real-time Extinction Risk Analysis",
    "Explainable AI Predictions",
    "Skill Half-Life Calculations"
  ];

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Left Panel - Features & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="absolute w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-purple-400/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Radar className="w-12 h-12" />
              <span className="text-4xl font-bold">HSER</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Track Skill<br />Extinction in<br />Real-Time
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Make data-driven decisions about workforce planning and curriculum development
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <p className="text-sm text-gray-200 mb-2">Trusted by leading organizations</p>
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm">Organizations worldwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="w-full max-w-md">
          <button
            onClick={() => window.history.back()}
            className={`flex items-center space-x-2 mb-8 ${
              isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
            } transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <div className={`flex rounded-xl p-1 mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <button
              onClick={() => setUserType('user')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                userType === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <User className="w-5 h-5 inline mr-2" />
              User
            </button>
            <button
              onClick={() => setUserType('admin')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                userType === 'admin'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <Shield className="w-5 h-5 inline mr-2" />
              Admin
            </button>
          </div>

          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyan-500 hover:text-cyan-400 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          <button
            onClick={handleGoogleAuth}
            className={`w-full py-4 rounded-xl font-semibold mb-6 flex items-center justify-center space-x-3 border-2 transition-all ${
              isDark
                ? 'bg-white text-gray-900 hover:bg-gray-100'
                : 'bg-white border-gray-300 text-gray-900 hover:border-cyan-500'
            } shadow-lg hover:shadow-xl`}
          >
            <Chrome className="w-6 h-6" />
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center mb-6">
            <div className={`flex-1 border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`}></div>
            <span className={`px-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>OR</span>
            <div className={`flex-1 border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`}></div>
          </div>

          <div className="space-y-5">
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Vivek Chaurasiya"
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-500'
                    } focus:outline-none`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-500'
                  } focus:outline-none`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-500'
                  } focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Organization (Optional)
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="Your company or university"
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-500'
                  } focus:outline-none`}
                />
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-cyan-500 hover:text-cyan-400 text-sm font-medium">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </div>

          {!isLogin && (
            <p className={`text-xs text-center mt-6 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              By signing up, you agree to our{' '}
              <a href="#" className="text-cyan-500 hover:text-cyan-400">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-cyan-500 hover:text-cyan-400">Privacy Policy</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HSERAuth;
