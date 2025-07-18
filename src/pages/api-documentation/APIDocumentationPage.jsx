import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QuickStartGuide from './components/QuickStartGuide';
import EndpointExplorer from './components/EndpointExplorer';
import CodeSamples from './components/CodeSamples';
import SDKLibraries from './components/SDKLibraries';
import RateLimiting from './components/RateLimiting';
import UseCaseExamples from './components/UseCaseExamples';

const APIDocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('quick-start');

  const sections = [
    {
      id: 'quick-start',
      title: 'Quick Start',
      icon: 'Rocket',
      description: 'Get up and running in minutes'
    },
    {
      id: 'explorer',
      title: 'API Explorer',
      icon: 'Code2',
      description: 'Test endpoints interactively'
    },
    {
      id: 'code-samples',
      title: 'Code Samples',
      icon: 'FileCode',
      description: 'Ready-to-use code examples'
    },
    {
      id: 'sdks',
      title: 'SDKs & Libraries',
      icon: 'Package',
      description: 'Official SDKs for popular languages'
    },
    {
      id: 'rate-limiting',
      title: 'Rate Limiting',
      icon: 'Clock',
      description: 'Usage limits and best practices'
    },
    {
      id: 'use-cases',
      title: 'Use Cases',
      icon: 'Lightbulb',
      description: 'Real-world implementation examples'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'quick-start':
        return <QuickStartGuide />;
      case 'explorer':
        return <EndpointExplorer />;
      case 'code-samples':
        return <CodeSamples />;
      case 'sdks':
        return <SDKLibraries />;
      case 'rate-limiting':
        return <RateLimiting />;
      case 'use-cases':
        return <UseCaseExamples />;
      default:
        return <QuickStartGuide />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">API Documentation</h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Everything you need to integrate with TaraBox API
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  iconName="ExternalLink"
                  iconPosition="left"
                  onClick={() => window.open('https://api.tarabox.com/docs', '_blank')}
                >
                  API Reference
                </Button>
                <Button
                  variant="default"
                  iconName="Key"
                  iconPosition="left"
                  className="bg-brand-primary hover:bg-brand-primary/90"
                >
                  Get API Key
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-border p-6 sticky top-8">
              <h2 className="font-semibold text-foreground mb-4">Documentation</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-brand-primary text-white shadow-brand'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={section.icon} size={16} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className={`text-xs ${
                        activeSection === section.id ? 'text-white/80' : 'text-muted-foreground'
                      }`}>
                        {section.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-medium text-foreground mb-3 text-sm">Quick Links</h3>
                <div className="space-y-2">
                  <a
                    href="https://status.tarabox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="Activity" size={14} />
                    <span>API Status</span>
                  </a>
                  <a
                    href="https://github.com/tarabox/examples"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="Github" size={14} />
                    <span>Code Examples</span>
                  </a>
                  <a
                    href="https://community.tarabox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="MessageCircle" size={14} />
                    <span>Community</span>
                  </a>
                  <a
                    href="mailto:support@tarabox.com"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="Mail" size={14} />
                    <span>Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderActiveSection()}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to start building?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using TaraBox API to power their applications. 
              Get started with our free tier and scale as you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                className="bg-white text-brand-primary hover:bg-white/90"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="border-white text-white hover:bg-white/10"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentationPage;