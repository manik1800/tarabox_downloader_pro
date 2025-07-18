import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ArticleCard = ({ article, onClick }) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-blue-600 bg-blue-50';
      case 'advanced': return 'text-orange-600 bg-orange-50';
      case 'expert': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'tutorial': return 'BookOpen';
      case 'guide': return 'Map';
      case 'troubleshooting': return 'AlertCircle';
      case 'api': return 'Code';
      case 'download': return 'Download';
      default: return 'FileText';
    }
  };

  const formatReadTime = (minutes) => {
    if (minutes < 60) return `${minutes} min read`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m read`;
  };

  return (
    <div
      onClick={() => onClick(article)}
      className="bg-white rounded-xl shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 cursor-pointer group overflow-hidden border border-border hover:border-brand-primary/20"
    >
      {/* Article Image */}
      {article.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(article.level)}`}>
              {article.level}
            </span>
            {article.featured && (
              <span className="text-xs px-2 py-1 rounded-full font-medium bg-brand-primary text-white">
                Featured
              </span>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Icon 
                name={getContentTypeIcon(article.contentType)} 
                size={16} 
                color="var(--color-brand-primary)" 
              />
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Article Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-brand-primary font-medium bg-brand-primary/10 px-2 py-1 rounded-full">
              {article.platform}
            </span>
            <span className="text-xs text-muted-foreground">
              {article.category}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Star" size={14} />
            <span className="text-sm">{article.rating}</span>
          </div>
        </div>

        {/* Article Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>

        {/* Article Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {article.description}
        </p>

        {/* Article Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-full"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-full">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Article Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{formatReadTime(article.readTime)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{article.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={12} />
              <span>{article.comments}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-sm font-medium">Read</span>
            <Icon name="ArrowRight" size={14} />
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Updated {article.lastUpdated}</span>
            <div className="flex items-center space-x-1">
              <Icon name="User" size={12} />
              <span>{article.author}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;