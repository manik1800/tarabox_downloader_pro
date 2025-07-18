import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Download Center', path: '/download-center' },
        { name: 'Premium Features', path: '/premium-features' },
        { name: 'API Documentation', path: '/api-documentation' },
        { name: 'Mobile Apps', path: '#' },
        { name: 'Browser Extension', path: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Knowledge Base', path: '/knowledge-base' },
        { name: 'Help Center', path: '#' },
        { name: 'Contact Support', path: '#' },
        { name: 'System Status', path: '#' },
        { name: 'Feature Requests', path: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '#' },
        { name: 'Blog', path: '#' },
        { name: 'Careers', path: '#' },
        { name: 'Press Kit', path: '#' },
        { name: 'Partners', path: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms of Service', path: '#' },
        { name: 'Cookie Policy', path: '#' },
        { name: 'GDPR Compliance', path: '#' },
        { name: 'Security', path: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'YouTube', icon: 'Youtube', url: '#' },
    { name: 'GitHub', icon: 'Github', url: '#' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/homepage" className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center">
                    <Icon name="Download" size={24} color="white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-secondary rounded-full flex items-center justify-center">
                    <Icon name="Zap" size={10} color="white" strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gradient-brand">TaraBox</h3>
                  <p className="text-sm text-gray-400 -mt-1">Downloader Pro</p>
                </div>
              </Link>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transform your cloud storage experience with lightning-fast downloads, no size restrictions, and seamless batch processing. Your digital freedom starts here.
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-primary transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-brand-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h4 className="font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-400 text-sm">Get the latest features and updates delivered to your inbox.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-primary transition-colors duration-200"
              />
              <button className="px-6 py-2 bg-brand-primary hover:bg-brand-primary/90 rounded-lg font-medium transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} TaraBox Downloader Pro. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-brand-primary" />
                <span>Global CDN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;