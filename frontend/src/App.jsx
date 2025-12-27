import React, { useState, useEffect, createContext, useContext } from 'react';
import { Radar, Home, Search, GitCompare, BarChart3, User, Info, Mail, HelpCircle, Shield, LogOut, Menu, X } from 'lucide-react';

// Import all components
import HSERLanding from './components/Landing';
import HSERAuth from './components/Auth';
import HSERSkillExplorer from './components/SkillExplorer';
import HSERSkillDetail from './components/SkillDetail';
import HSERSkillComparison from './components/SkillComparison';
import HSERUserDashboard from './components/UserDashboard';
import HSERAbout from './components/About';
import HSERContactAndSupport from './components/Contact';

// Auth Context
const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Auth Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Main App with Router
const HSERApp = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const pages = [
    { id: 'landing', label: 'Home', icon: <Home className="w-5 h-5" />, protected: false },
    { id: 'explorer', label: 'Skill Explorer', icon: <Search className="w-5 h-5" />, protected: false },
    { id: 'comparison', label: 'Compare', icon: <GitCompare className="w-5 h-5" />, protected: false },
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" />, protected: true },
    { id: 'about', label: 'About', icon: <Info className="w-5 h-5" />, protected: false },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-5 h-5" />, protected: false },
  ];

  const handleNavigation = (pageId) => {
    if (pages.find(p => p.id === pageId)?.protected && !isAuthenticated) {
      setCurrentPage('auth');
    } else {
      setCurrentPage(pageId);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => handleNavigation('landing')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <Radar className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className={`text-2xl font-bold bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-cyan-600 to-purple-600'} bg-clip-text text-transparent`}>
                HSER
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {pages.map(page => (
                (!page.protected || (page.protected && isAuthenticated)) && (
                  <button
                    key={page.id}
                    onClick={() => handleNavigation(page.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === page.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                        : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {page.icon}
                    <span>{page.label}</span>
                  </button>
                )
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'} hover:opacity-80 transition-opacity`}
              >
                {isDark ? '🌙' : '☀️'}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {user?.name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
                    title="Logout"
                  >
                    <LogOut className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigation('auth')}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className={isDark ? 'text-white' : 'text-gray-900'} /> : <Menu className={isDark ? 'text-white' : 'text-gray-900'} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t ${isDark ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="px-4 py-4 space-y-2">
              {pages.map(page => (
                (!page.protected || (page.protected && isAuthenticated)) && (
                  <button
                    key={page.id}
                    onClick={() => handleNavigation(page.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      currentPage === page.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                        : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {page.icon}
                    <span>{page.label}</span>
                  </button>
                )
              ))}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium ${isDark ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'} transition-all`}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavigation('auth')}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Render Actual Components */}
      <main>
        {currentPage === 'landing' && <HSERLanding isDark={isDark} onNavigate={handleNavigation} />}
        {currentPage === 'auth' && <HSERAuth isDark={isDark} onNavigate={handleNavigation} />}
        {currentPage === 'explorer' && <HSERSkillExplorer isDark={isDark} />}
        {currentPage === 'comparison' && <HSERSkillComparison isDark={isDark} />}
        {currentPage === 'dashboard' && isAuthenticated && <HSERUserDashboard isDark={isDark} user={user} />}
        {currentPage === 'about' && <HSERAbout isDark={isDark} />}
        {currentPage === 'contact' && <HSERContactAndSupport isDark={isDark} />}
        {currentPage === 'detail' && <HSERSkillDetail isDark={isDark} />}
      </main>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} mt-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Radar className="w-6 h-6 text-cyan-400" />
                <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>HSER</span>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Predicting skill extinction in the AI era
              </p>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Product</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation('explorer')} className={`text-sm ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}>Features</button></li>
                <li><button onClick={() => handleNavigation('dashboard')} className={`text-sm ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}>Dashboard</button></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Company</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation('about')} className={`text-sm ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}>About</button></li>
                <li><button onClick={() => handleNavigation('contact')} className={`text-sm ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}>Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className={`text-sm ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}>Privacy Policy</a></li>
                <li><a href="#" className={`text-sm ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}>Terms</a></li>
              </ul>
            </div>
          </div>
          <div className={`pt-8 mt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-sm">© 2025 HSER. All rights reserved. Built by Vivek Chaurasiya</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Root App
const App = () => (
  <AuthProvider>
    <HSERApp />
  </AuthProvider>
);

export default App;