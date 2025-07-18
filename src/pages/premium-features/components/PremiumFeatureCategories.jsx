import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PremiumFeatureCategories = () => {
  const [activeCategory, setActiveCategory] = useState('speed');

  const categories = {
    speed: {
      title: "Speed & Performance",
      icon: "Zap",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      features: [
        {
          name: "Parallel Downloading",
          description: "Download multiple files simultaneously with intelligent bandwidth allocation",
          benefit: "Save up to 80% time on bulk downloads",
          icon: "Download"
        },
        {
          name: "Bandwidth Optimization",
          description: "Smart compression and routing for maximum download speeds",
          benefit: "Up to 10x faster than standard downloads",
          icon: "Gauge"
        },
        {
          name: "Resume Interrupted Downloads",
          description: "Automatically resume downloads from where they left off",
          benefit: "Never lose progress on large files",
          icon: "Play"
        },
        {
          name: "CDN Acceleration",
          description: "Global content delivery network for optimal routing",
          benefit: "Consistent speeds worldwide",
          icon: "Globe"
        }
      ]
    },
    productivity: {
      title: "Productivity Tools",
      icon: "Briefcase",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: [
        {
          name: "Batch URL Processing",
          description: "Process up to 1000 URLs at once with smart duplicate detection",
          benefit: "Handle entire folders in seconds",
          icon: "Package"
        },
        {
          name: "Scheduled Downloads",
          description: "Set downloads to start at specific times or intervals",
          benefit: "Download during off-peak hours",
          icon: "Clock"
        },
        {
          name: "Smart Categorization",
          description: "Automatically organize downloads by file type and source",
          benefit: "Keep your files organized",
          icon: "FolderOpen"
        },
        {
          name: "Download Queue Management",
          description: "Advanced queue with priority settings and dependencies",
          benefit: "Complete control over download order",
          icon: "List"
        }
      ]
    },
    professional: {
      title: "Professional Features",
      icon: "Crown",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: [
        {
          name: "Team Collaboration",
          description: "Share download queues and manage team access permissions",
          benefit: "Streamline team workflows",
          icon: "Users"
        },
        {
          name: "Usage Analytics",
          description: "Detailed insights into download patterns and bandwidth usage",
          benefit: "Optimize your download strategy",
          icon: "BarChart3"
        },
        {
          name: "API Integration",
          description: "Full REST API access for custom integrations and automation",
          benefit: "Integrate with your existing tools",
          icon: "Code"
        },
        {
          name: "Priority Support",
          description: "24/7 dedicated support with guaranteed response times",
          benefit: "Get help when you need it most",
          icon: "Headphones"
        }
      ]
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">Premium Feature Categories</h2>
        <p className="text-muted-foreground">Explore our comprehensive suite of advanced capabilities</p>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-border">
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`flex-1 p-4 text-center transition-all duration-200 ${
              activeCategory === key
                ? 'bg-brand-primary text-white border-b-2 border-brand-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon 
                name={category.icon} 
                size={18} 
                color={activeCategory === key ? 'white' : 'currentColor'} 
              />
              <span className="font-medium">{category.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Active Category Content */}
      <div className="p-6">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${categories[activeCategory].bgColor} mb-6`}>
          <Icon 
            name={categories[activeCategory].icon} 
            size={16} 
            className={categories[activeCategory].color} 
          />
          <span className={`text-sm font-medium ${categories[activeCategory].color}`}>
            {categories[activeCategory].title}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories[activeCategory].features.map((feature, index) => (
            <div key={index} className="bg-muted/20 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon} size={20} color="var(--color-brand-primary)" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={14} color="var(--color-success)" />
                    <span className="text-sm text-success font-medium">{feature.benefit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatureCategories;