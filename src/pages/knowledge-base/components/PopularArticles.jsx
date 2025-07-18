import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PopularArticles = ({ articles, onArticleClick }) => {
  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-blue-600 bg-blue-50';
      case 'advanced': return 'text-orange-600 bg-orange-50';
      case 'expert': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-elevation-2 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Popular Articles</h2>
            <p className="text-sm text-muted-foreground">Most viewed this week</p>
          </div>
        </div>
        <button className="text-sm text-brand-primary hover:text-brand-primary/80 font-medium flex items-center space-x-1">
          <span>View All</span>
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {articles.map((article, index) => (
          <div
            key={article.id}
            onClick={() => onArticleClick(article)}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/30 transition-colors duration-200 cursor-pointer group"
          >
            {/* Rank Number */}
            <div className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-brand-primary">
                {index + 1}
              </span>
            </div>

            {/* Article Thumbnail */}
            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
              <Image
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Article Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs text-brand-primary font-medium bg-brand-primary/10 px-2 py-1 rounded-full">
                  {article.platform}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(article.level)}`}>
                  {article.level}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-foreground group-hover:text-brand-primary transition-colors duration-200 line-clamp-2 mb-1">
                {article.title}
              </h3>

              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {article.description}
              </p>

              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span>{formatViews(article.views)} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{article.readTime} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} />
                  <span>{article.rating}</span>
                </div>
              </div>
            </div>

            {/* Trending Indicator */}
            <div className="flex-shrink-0 flex flex-col items-end space-y-2">
              <div className="flex items-center space-x-1 text-success">
                <Icon name="TrendingUp" size={14} />
                <span className="text-xs font-medium">+{article.growthRate}%</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {article.timeAgo}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full py-3 text-sm font-medium text-brand-primary hover:text-brand-primary/80 hover:bg-brand-primary/5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
          <Icon name="Plus" size={16} />
          <span>Load More Popular Articles</span>
        </button>
      </div>
    </div>
  );
};

export default PopularArticles;