import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickLinks = ({ onLinkClick }) => {
  const quickLinks = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'New to TaraBox? Start here',
      icon: 'Play',
      color: 'green',
      links: [
        { title: 'Account Setup Guide', url: '/kb/account-setup' },
        { title: 'First Download Tutorial', url: '/kb/first-download' },
        { title: 'Browser Extension Install', url: '/kb/browser-extension' },
        { title: 'Mobile App Setup', url: '/kb/mobile-setup' }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Common issues and solutions',
      icon: 'AlertCircle',
      color: 'red',
      links: [
        { title: 'Download Errors', url: '/kb/download-errors' },
        { title: 'Speed Issues', url: '/kb/speed-issues' },
        { title: 'Login Problems', url: '/kb/login-problems' },
        { title: 'Payment Issues', url: '/kb/payment-issues' }
      ]
    },
    {
      id: 'api-integration',
      title: 'API Integration',
      description: 'Developer resources',
      icon: 'Code',
      color: 'blue',
      links: [
        { title: 'API Quick Start', url: '/kb/api-quickstart' },
        { title: 'Authentication Guide', url: '/kb/api-auth' },
        { title: 'Rate Limits', url: '/kb/rate-limits' },
        { title: 'Code Examples', url: '/kb/code-examples' }
      ]
    },
    {
      id: 'premium-features',
      title: 'Premium Features',
      description: 'Advanced functionality',
      icon: 'Crown',
      color: 'orange',
      links: [
        { title: 'Batch Downloads', url: '/kb/batch-downloads' },
        { title: 'Speed Optimization', url: '/kb/speed-optimization' },
        { title: 'Priority Support', url: '/kb/priority-support' },
        { title: 'Advanced Analytics', url: '/kb/analytics' }
      ]
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-50 hover:bg-green-100',
          icon: 'bg-green-100 text-green-600',
          text: 'text-green-600'
        };
      case 'red':
        return {
          bg: 'bg-red-50 hover:bg-red-100',
          icon: 'bg-red-100 text-red-600',
          text: 'text-red-600'
        };
      case 'blue':
        return {
          bg: 'bg-blue-50 hover:bg-blue-100',
          icon: 'bg-blue-100 text-blue-600',
          text: 'text-blue-600'
        };
      case 'orange':
        return {
          bg: 'bg-orange-50 hover:bg-orange-100',
          icon: 'bg-orange-100 text-orange-600',
          text: 'text-orange-600'
        };
      default:
        return {
          bg: 'bg-gray-50 hover:bg-gray-100',
          icon: 'bg-gray-100 text-gray-600',
          text: 'text-gray-600'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-elevation-2 p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Quick Links</h2>
          <p className="text-sm text-muted-foreground">Jump to what you need</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickLinks.map((section) => {
          const colors = getColorClasses(section.color);
          
          return (
            <div
              key={section.id}
              className={`${colors.bg} rounded-lg p-5 transition-all duration-200 hover:shadow-elevation-1`}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={section.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {section.links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => onLinkClick(link.url)}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-white/60 rounded-md transition-colors duration-200 flex items-center justify-between group"
                  >
                    <span>{link.title}</span>
                    <Icon 
                      name="ArrowRight" 
                      size={14} 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                    />
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/50">
                <button 
                  onClick={() => onLinkClick(`/kb/category/${section.id}`)}
                  className={`text-sm font-medium ${colors.text} hover:underline flex items-center space-x-1`}
                >
                  <span>View all {section.title.toLowerCase()}</span>
                  <Icon name="ExternalLink" size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;