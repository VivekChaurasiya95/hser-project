import React, { useState } from 'react';
import { Radar, Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, Book, Shield, FileText, CheckCircle, ChevronDown } from 'lucide-react';

const HSERContactAndSupport = ({ isDark }) => {
  const [activePage, setActivePage] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "support@hser.ai",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "96729032XX",
      description: "Mon-Fri, 9am-6pm IST"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Gwalior, Madhya Pradesh, IN",
      description: "Visit our office"
    }
  ];

  const faqs = [
    {
      question: "What is HSER and how does it work?",
      answer: "HSER (Human Skill Extinction Radar) is a predictive analytics platform that analyzes 50+ software and IT skills to determine their extinction risk. Using transparent mathematical formulas, we calculate metrics like Replacement Force Score, Protection Score, and Skill Half-Life based on automation levels, AI tool growth, and industry adoption rates."
    },
    {
      question: "How accurate are the extinction risk predictions?",
      answer: "Our predictions are based on multiple data sources including industry trends, AI development trajectories, and adoption velocities. While we use validated mathematical models, all predictions should be viewed as probabilistic forecasts. We provide 'explainable AI' insights so you understand the reasoning behind each prediction."
    },
    {
      question: "Can I track custom skills not in your database?",
      answer: "Currently, we focus on 50 core software and IT skills. However, our Enterprise plan allows custom skill analysis. Contact our team to discuss adding specific skills relevant to your organization."
    },
    {
      question: "How often is the data updated?",
      answer: "Our skill attributes and risk calculations are updated quarterly based on the latest industry data, tool releases, and adoption metrics. Real-time alerts notify you of significant changes in risk levels."
    },
    {
      question: "What's the difference between User and Admin accounts?",
      answer: "User accounts can track skills, view analytics, and generate reports. Admin accounts have additional permissions including team management, custom alerts configuration, and bulk export capabilities for organizational use."
    },
    {
      question: "Do you offer API access?",
      answer: "Yes! Our Enterprise plan includes full API access with comprehensive documentation. You can integrate HSER data into your existing HR systems, learning platforms, or custom applications."
    },
    {
      question: "How do I interpret the Skill Half-Life metric?",
      answer: "Skill Half-Life represents the estimated time (in years) until a skill's relevance declines by 50%. For example, a half-life of 5.3 years means that in ~5 years, demand for this skill may be half of what it is today. This helps in planning reskilling timelines."
    },
    {
      question: "Can HSER help with curriculum planning?",
      answer: "Absolutely! Universities use HSER to design future-proof curricula by identifying high-protection-score skills with longer half-lives. We also provide category-level insights to balance foundational vs. emerging skills in educational programs."
    }
  ];

  const helpTopics = [
    {
      icon: <Book className="w-8 h-8" />,
      title: "Getting Started",
      description: "Learn the basics of using HSER",
      articles: ["Quick Start Guide", "Understanding Metrics", "Dashboard Overview"]
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Using the Platform",
      description: "Detailed feature guides",
      articles: ["Tracking Skills", "Comparing Skills", "Setting Up Alerts"]
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: ["Login Issues", "Data Export Problems", "API Connection"]
    }
  ];

  const renderContactPage = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Get in Touch
        </h1>
        <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {contactInfo.map((info, idx) => (
          <div key={idx} className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <div className="text-cyan-400 flex justify-center mb-4">{info.icon}</div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{info.title}</h3>
            <p className="text-cyan-400 font-semibold mb-1">{info.value}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{info.description}</p>
          </div>
        ))}
      </div>

      <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Send us a Message
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                isDark
                  ? 'bg-gray-900 border-gray-700 text-white focus:border-cyan-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
              } focus:outline-none`}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                isDark
                  ? 'bg-gray-900 border-gray-700 text-white focus:border-cyan-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
              } focus:outline-none`}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
              isDark
                ? 'bg-gray-900 border-gray-700 text-white focus:border-cyan-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
            } focus:outline-none`}
            placeholder="How can we help?"
          />
        </div>
        <div className="mt-6">
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
              isDark
                ? 'bg-gray-900 border-gray-700 text-white focus:border-cyan-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
            } focus:outline-none`}
            placeholder="Tell us more about your inquiry..."
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center space-x-2"
        >
          <Send className="w-5 h-5" />
          <span>Send Message</span>
        </button>
      </div>
    </div>
  );

  const renderHelpPage = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Help Center
        </h1>
        <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Find answers and get support
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {helpTopics.map((topic, idx) => (
          <div key={idx} className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:border-cyan-500 transition-all cursor-pointer`}>
            <div className="text-cyan-400 mb-4">{topic.icon}</div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{topic.title}</h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{topic.description}</p>
            <ul className="space-y-2">
              {topic.articles.map((article, aidx) => (
                <li key={aidx} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{article}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className={`w-full px-6 py-4 flex items-center justify-between ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-all`}
              >
                <span className={`font-semibold text-left ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                <ChevronDown className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'} transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === idx && (
                <div className={`px-6 py-4 ${isDark ? 'bg-gray-800/50' : 'bg-white'}`}>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacyPage = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Privacy Policy
        </h1>
        <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Last updated: December 26, 2025
        </p>
      </div>

      <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} space-y-6`}>
        <section>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>1. Information We Collect</h2>
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            We collect information that you provide directly to us, including:
          </p>
          <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <li>Account information (name, email, organization)</li>
            <li>Usage data (skills tracked, searches, reports generated)</li>
            <li>Communication data (support requests, feedback)</li>
            <li>Technical data (IP address, browser type, device information)</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>2. How We Use Your Information</h2>
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            We use the information we collect to:
          </p>
          <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <li>Provide, maintain, and improve our services</li>
            <li>Personalize your experience and deliver relevant content</li>
            <li>Send you updates, newsletters, and marketing communications</li>
            <li>Respond to your requests and provide customer support</li>
            <li>Analyze usage patterns and optimize platform performance</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>3. Data Security</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. 
            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>4. Data Sharing</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            We do not sell your personal information. We may share data with service providers who assist in operating our platform, 
            but only to the extent necessary and under strict confidentiality agreements.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>5. Your Rights</h2>
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            You have the right to:
          </p>
          <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a copy of your data</li>
            <li>Lodge a complaint with data protection authorities</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>6. Contact Us</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            If you have questions about this Privacy Policy, please contact us at privacy@hser.ai
          </p>
        </section>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`sticky top-0 z-40 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Radar className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>HSER</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActivePage('contact')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activePage === 'contact'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Contact
              </button>
              <button
                onClick={() => setActivePage('help')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activePage === 'help'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Help
              </button>
              <button
                onClick={() => setActivePage('privacy')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activePage === 'privacy'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Privacy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activePage === 'contact' && renderContactPage()}
        {activePage === 'help' && renderHelpPage()}
        {activePage === 'privacy' && renderPrivacyPage()}
      </div>
    </div>
  );
};

export default HSERContactAndSupport;
