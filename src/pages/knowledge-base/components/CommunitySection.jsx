import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunitySection = ({ onContributionClick, onForumClick }) => {
  const communityStats = [
    { label: 'Active Contributors', value: '2,847', icon: 'Users', color: 'text-blue-600' },
    { label: 'Community Articles', value: '156', icon: 'FileText', color: 'text-green-600' },
    { label: 'Tips Shared', value: '1,293', icon: 'Lightbulb', color: 'text-orange-600' },
    { label: 'Solutions Posted', value: '892', icon: 'CheckCircle', color: 'text-purple-600' }
  ];

  const recentContributions = [
    {
      id: 1,
      type: 'tip',
      title: 'Speed up Google Drive downloads with this browser setting',
      author: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      likes: 47,
      comments: 12,
      timeAgo: '2 hours ago',
      platform: 'Google Drive'
    },
    {
      id: 2,
      type: 'solution',
      title: 'Fixed: Dropbox API rate limit errors in batch downloads',
      author: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      likes: 23,
      comments: 8,
      timeAgo: '5 hours ago',
      platform: 'Dropbox'
    },
    {
      id: 3,
      type: 'guide',
      title: 'Complete automation setup for OneDrive using Python',
      author: 'Alex Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      likes: 89,
      comments: 34,
      timeAgo: '1 day ago',
      platform: 'OneDrive'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'tip': return 'Lightbulb';
      case 'solution': return 'CheckCircle';
      case 'guide': return 'BookOpen';
      default: return 'MessageCircle';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'tip': return 'text-orange-600 bg-orange-50';
      case 'solution': return 'text-green-600 bg-green-50';
      case 'guide': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-elevation-2 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Community Contributions</h2>
            <p className="text-sm text-muted-foreground">Tips, solutions, and guides from our users</p>
          </div>
        </div>
        <button 
          onClick={onForumClick}
          className="text-sm text-brand-primary hover:text-brand-primary/80 font-medium flex items-center space-x-1"
        >
          <span>Visit Forum</span>
          <Icon name="ExternalLink" size={16} />
        </button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {communityStats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Contributions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Contributions</h3>
        
        {recentContributions.map((contribution) => (
          <div
            key={contribution.id}
            onClick={() => onContributionClick(contribution)}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/30 transition-colors duration-200 cursor-pointer group"
          >
            {/* Author Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={contribution.avatar}
                alt={contribution.author}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>

            {/* Contribution Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(contribution.type)}`}>
                  <Icon name={getTypeIcon(contribution.type)} size={12} className="inline mr-1" />
                  {contribution.type}
                </span>
                <span className="text-xs text-brand-primary font-medium bg-brand-primary/10 px-2 py-1 rounded-full">
                  {contribution.platform}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-foreground group-hover:text-brand-primary transition-colors duration-200 line-clamp-2 mb-2">
                {contribution.title}
              </h4>

              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>by {contribution.author}</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={12} />
                  <span>{contribution.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MessageCircle" size={12} />
                  <span>{contribution.comments}</span>
                </div>
                <span>{contribution.timeAgo}</span>
              </div>
            </div>

            {/* Action Arrow */}
            <div className="flex-shrink-0">
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-200" 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Contribute Section */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="bg-gradient-brand rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Share Your Knowledge</h3>
              <p className="text-sm opacity-90 mb-4">
                Help others by sharing your tips, solutions, and creative use cases
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Award" size={16} />
                  <span>Earn reputation points</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Gift" size={16} />
                  <span>Get featured</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onContributionClick}
              className="bg-white text-brand-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Contribute</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;