import React, { useState, useEffect } from 'react';
import { Radar, Mail, Lock, User, Eye, EyeOff, Chrome, ArrowLeft, Shield, CheckCircle } from 'lucide-react';

// REPLACE WITH YOUR ACTUAL GOOGLE CLIENT ID
const GOOGLE_CLIENT_ID = "467092457226-m2vsflq0l91o1aalh2ht8mf0pqm45tkb.apps.googleusercontent.com";

const HSERAuth = ({ isDark, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('user');
  const [loading, setLoading] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organization: ''
  });

  useEffect(() => {
    // Load Google Identity Services
    const loadGoogleScript = () => {
      // Check if already loaded
      if (window.google?.accounts) {
        console.log('Google already loaded');
        initializeGoogle();
        return;
      }

      // Remove existing script if any
      const existingScript = document.querySelector('script[src*="accounts.google.com"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('✅ Google script loaded successfully');
        initializeGoogle();
      };
      
      script.onerror = (error) => {
        console.error('❌ Failed to load Google script:', error);
        setGoogleLoaded(false);
      };

      document.body.appendChild(script);
    };

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id) {
        console.error('❌ Google API not available');
        setTimeout(initializeGoogle, 100);
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        
        console.log('✅ Google Sign-In initialized');
        setGoogleLoaded(true);
      } catch (error) {
        console.error('❌ Error initializing Google:', error);
        setGoogleLoaded(false);
      }
    };

    loadGoogleScript();

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="accounts.google.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const handleGoogleCallback = async (response) => {
    console.log('🔐 Google callback received');
    
    try {
      setLoading(true);
      
      if (!response.credential) {
        throw new Error('No credential received from Google');
      }

      console.log('📤 Sending credential to backend...');
      
      const backendResponse = await fetch('http://localhost:8000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: response.credential,
          user_type: userType
        })
      });

      const data = await backendResponse.json();
      console.log('📥 Backend response:', data);

      if (backendResponse.ok) {
        console.log('✅ Authentication successful');
        
        // Save to localStorage
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify({
          name: data.name,
          email: data.email,
          user_type: data.user_type
        }));
        
        alert('✅ Google Sign-In successful!');
        
        // Reload page to update auth state
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        throw new Error(data.detail || 'Authentication failed');
      }
    } catch (error) {
      console.error('❌ Google auth error:', error);
      alert(`Google Sign-In failed: ${error.message}\n\nPlease check:\n1. Backend is running on port 8000\n2. Google Client ID is correct\n3. CORS is properly configured`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    if (!googleLoaded) {
      alert('⏳ Google Sign-In is still loading. Please wait a moment and try again.');
      return;
    }

    if (!window.google?.accounts?.id) {
      alert('❌ Google Sign-In not available. Please refresh the page and try again.');
      return;
    }

    try {
      console.log('🚀 Triggering Google Sign-In...');
      
      // Trigger Google One Tap or Sign-In prompt
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.log('⚠️ One Tap not displayed, reason:', notification.getNotDisplayedReason());
          
          // Fallback: render button and trigger click
          const buttonDiv = document.createElement('div');
          buttonDiv.style.display = 'none';
          document.body.appendChild(buttonDiv);
          
          window.google.accounts.id.renderButton(buttonDiv, {
            theme: 'filled_blue',
            size: 'large',
            type: 'standard',
          });
          
          // Trigger click programmatically
          setTimeout(() => {
            const button = buttonDiv.querySelector('div[role="button"]');
            if (button) {
              button.click();
            }
            document.body.removeChild(buttonDiv);
          }, 100);
        }
        
        if (notification.isSkippedMoment()) {
          console.log('⏭️ User skipped One Tap');
        }
      });
    } catch (error) {
      console.error('❌ Error triggering Google Sign-In:', error);
      alert('Failed to open Google Sign-In. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert('Please fill in email and password');
      return;
    }

    if (!isLogin && !formData.name) {
      alert('Please enter your name');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const url = `http://localhost:8000${endpoint}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name || formData.email.split('@')[0],
          organization: formData.organization || '',
          user_type: userType
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify({
          name: data.name,
          email: data.email,
          user_type: data.user_type
        }));
        
        alert(`${isLogin ? 'Login' : 'Registration'} successful!`);
        window.location.reload();
      } else {
        alert(data.detail || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Backend connection error. Ensure backend is running on port 8000');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "50+ Software & IT Skills Tracked",
    "Real-time Extinction Risk Analysis",
    "Explainable AI Predictions",
    "Skill Half-Life Calculations"
  ];

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Left Panel */}
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
                <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="w-full max-w-md">
          <button
            onClick={() => onNavigate('landing')}
            className={`flex items-center space-x-2 mb-8 ${
              isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
            } transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          {/* User Type Toggle */}
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

          {/* Google Auth Button */}
          <button
            onClick={handleGoogleAuth}
            disabled={loading || !googleLoaded}
            className={`w-full py-4 rounded-xl font-semibold mb-6 flex items-center justify-center space-x-3 border-2 transition-all ${
              isDark
                ? 'bg-white text-gray-900 hover:bg-gray-100'
                : 'bg-white border-gray-300 text-gray-900 hover:border-cyan-500'
            } shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Chrome className="w-6 h-6" />
            <span>{googleLoaded ? 'Continue with Google' : 'Loading Google Sign-In...'}</span>
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
                    placeholder="John Doe"
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

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
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