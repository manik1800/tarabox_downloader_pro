import React from 'react';
import Icon from '../../../components/AppIcon';

const SupportedPlatforms = () => {
  const platforms = [
    {
      name: 'Google Drive',
      icon: 'HardDrive',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Files, folders & shared links',
      features: ['Bulk download', 'Folder sync', 'Direct links']
    },
    {
      name: 'Dropbox',
      icon: 'Cloud',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      description: 'Personal & business accounts',
      features: ['Team folders', 'Version history', 'Smart sync']
    },
    {
      name: 'OneDrive',
      icon: 'Database',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      description: 'Microsoft ecosystem integration',
      features: ['Office files', 'SharePoint', 'Teams integration']
    },
    {
      name: 'Box',
      icon: 'Package',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Enterprise file sharing',
      features: ['Enterprise security', 'Workflow automation', 'API access']
    },
    {
      name: 'iCloud',
      icon: 'Smartphone',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      description: 'Apple device synchronization',
      features: ['Photos & videos', 'Documents', 'App data']
    },
    {
      name: 'MediaFire',
      icon: 'Flame',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Free file hosting service',
      features: ['Large files', 'Direct download', 'No registration']
    },
    {
      name: 'MEGA',
      icon: 'Lock',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Encrypted cloud storage',
      features: ['End-to-end encryption', 'Large storage', 'Privacy focused']
    },
    {
      name: 'pCloud',
      icon: 'CloudSnow',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Lifetime cloud storage',
      features: ['Crypto folder', 'Media streaming', 'File versioning']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Works with All Major{' '}
            <span className="text-gradient-brand">Cloud Platforms</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Seamlessly download from any cloud storage service with optimized connections and platform-specific features. No more switching between different tools.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="group bg-white rounded-xl p-6 border border-border hover:border-brand-primary/30 hover:shadow-brand transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${platform.bgColor} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={platform.icon} size={24} className={platform.color} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {platform.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Platform Stats */}
        <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-2xl p-8 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-brand-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Supported Platforms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-secondary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Platform Monitoring</div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">More platforms coming soon:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Amazon Drive', 'Yandex Disk', 'Baidu Cloud', 'Sync.com'].map((platform) => (
              <div key={platform} className="bg-muted/50 rounded-lg px-4 py-2 text-sm text-muted-foreground">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedPlatforms;