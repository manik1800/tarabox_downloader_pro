import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchBar = ({ onSearch, onFilterChange, searchQuery, selectedFilters }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'google-drive', label: 'Google Drive' },
    { value: 'dropbox', label: 'Dropbox' },
    { value: 'onedrive', label: 'OneDrive' },
    { value: 'mega', label: 'MEGA' },
    { value: 'mediafire', label: 'MediaFire' },
    { value: 'box', label: 'Box' },
    { value: 'icloud', label: 'iCloud' },
    { value: 'amazon-s3', label: 'Amazon S3' }
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const contentTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'tutorial', label: 'Tutorials' },
    { value: 'guide', label: 'Guides' },
    { value: 'troubleshooting', label: 'Troubleshooting' },
    { value: 'api', label: 'API Documentation' },
    { value: 'video', label: 'Video Tutorials' },
    { value: 'download', label: 'Downloads' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
    if (e.target.value === '') {
      onSearch('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const popularSearches = [
    'Download speed optimization',
    'API integration',
    'Batch downloads',
    'Error troubleshooting',
    'Mobile downloads',
    'Premium features'
  ];

  return (
    <div className="bg-white rounded-xl shadow-elevation-2 p-6 mb-8">
      <div className="flex flex-col space-y-6">
        {/* Search Input */}
        <div className="relative">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Search knowledge base... (e.g., 'Google Drive API', 'download errors')"
                value={localQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="pr-12"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-brand-primary transition-colors duration-200"
              >
                <Icon name="Search" size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Platform"
            options={platformOptions}
            value={selectedFilters.platform || 'all'}
            onChange={(value) => onFilterChange('platform', value)}
            className="w-full"
          />
          <Select
            label="Difficulty Level"
            options={levelOptions}
            value={selectedFilters.level || 'all'}
            onChange={(value) => onFilterChange('level', value)}
            className="w-full"
          />
          <Select
            label="Content Type"
            options={contentTypeOptions}
            value={selectedFilters.contentType || 'all'}
            onChange={(value) => onFilterChange('contentType', value)}
            className="w-full"
          />
        </div>

        {/* Popular Searches */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground font-medium">Popular:</span>
            {popularSearches.slice(0, 4).map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  setLocalQuery(search);
                  onSearch(search);
                }}
                className="text-xs px-3 py-1 bg-muted/50 hover:bg-brand-primary/10 hover:text-brand-primary rounded-full transition-all duration-200 border border-transparent hover:border-brand-primary/20"
              >
                {search}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={16} />
              <span>247 articles</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Play" size={16} />
              <span>89 videos</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={16} />
              <span>34 resources</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;