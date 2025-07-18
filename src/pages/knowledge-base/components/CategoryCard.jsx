import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryCard = ({ category, onClick }) => {
  const getIconColor = (color) => {
    switch (color) {
      case 'blue': return 'var(--color-brand-primary)';
      case 'green': return 'var(--color-success)';
      case 'orange': return 'var(--color-warning)';
      case 'purple': return '#8B5CF6';
      case 'red': return 'var(--color-error)';
      case 'teal': return 'var(--color-brand-secondary)';
      default: return 'var(--color-brand-primary)';
    }
  };

  const getBgColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 hover:bg-blue-100';
      case 'green': return 'bg-green-50 hover:bg-green-100';
      case 'orange': return 'bg-orange-50 hover:bg-orange-100';
      case 'purple': return 'bg-purple-50 hover:bg-purple-100';
      case 'red': return 'bg-red-50 hover:bg-red-100';
      case 'teal': return 'bg-teal-50 hover:bg-teal-100';
      default: return 'bg-blue-50 hover:bg-blue-100';
    }
  };

  return (
    <div
      onClick={() => onClick(category)}
      className={`${getBgColor(category.color)} rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-elevation-2 hover:scale-105 group border border-transparent hover:border-${category.color}-200`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow duration-300`}>
          <Icon 
            name={category.icon} 
            size={24} 
            color={getIconColor(category.color)}
            strokeWidth={2}
          />
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="FileText" size={14} />
          <span>{category.articleCount}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors duration-200">
        {category.title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {category.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={12} />
            <span>{category.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{category.lastUpdated}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-sm font-medium">Explore</span>
          <Icon name="ArrowRight" size={16} />
        </div>
      </div>

      {category.featured && (
        <div className="absolute top-4 right-4">
          <div className="bg-brand-primary text-white text-xs px-2 py-1 rounded-full font-medium">
            Featured
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;