import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import SearchBar from './components/SearchBar';
import CategoryCard from './components/CategoryCard';
import ArticleCard from './components/ArticleCard';
import PopularArticles from './components/PopularArticles';
import QuickLinks from './components/QuickLinks';
import CommunitySection from './components/CommunitySection';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    platform: 'all',
    level: 'all',
    contentType: 'all'
  });
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mock data for categories
  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Essential guides for new users to set up accounts, install extensions, and make their first downloads successfully.',
      icon: 'Play',
      color: 'green',
      articleCount: 24,
      views: '45.2K',
      lastUpdated: '2 days ago',
      featured: true
    },
    {
      id: 'platform-guides',
      title: 'Platform Guides',
      description: 'Detailed instructions for downloading from Google Drive, Dropbox, OneDrive, MEGA, and other cloud storage services.',
      icon: 'Cloud',
      color: 'blue',
      articleCount: 89,
      views: '128.7K',
      lastUpdated: '1 day ago',
      featured: false
    },
    {
      id: 'advanced-techniques',
      title: 'Advanced Techniques',
      description: 'API integration, automation scripts, batch processing, and power user features for maximum efficiency.',
      icon: 'Settings',
      color: 'purple',
      articleCount: 47,
      views: '67.3K',
      lastUpdated: '3 days ago',
      featured: false
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Solutions for common download errors, speed issues, authentication problems, and platform-specific challenges.',
      icon: 'AlertCircle',
      color: 'red',
      articleCount: 63,
      views: '92.1K',
      lastUpdated: '1 day ago',
      featured: true
    },
    {
      id: 'api-documentation',
      title: 'API Documentation',
      description: 'Complete developer resources including authentication, endpoints, rate limits, and integration examples.',
      icon: 'Code',
      color: 'orange',
      articleCount: 31,
      views: '34.8K',
      lastUpdated: '4 days ago',
      featured: false
    },
    {
      id: 'mobile-downloads',
      title: 'Mobile Downloads',
      description: 'Optimize downloads on mobile devices, manage offline files, and sync across platforms seamlessly.',
      icon: 'Smartphone',
      color: 'teal',
      articleCount: 18,
      views: '23.5K',
      lastUpdated: '5 days ago',
      featured: false
    }
  ];

  // Mock data for articles
  const allArticles = [
    {
      id: 1,
      title: 'Complete Guide to Google Drive Batch Downloads',
      description: 'Learn how to download multiple files and folders from Google Drive efficiently using TaraBox Pro features. This comprehensive guide covers folder selection, file filtering, and optimization techniques.',
      platform: 'Google Drive',
      category: 'Platform Guides',
      level: 'intermediate',
      contentType: 'guide',
      readTime: 12,
      views: '15.2K',
      comments: 89,
      rating: 4.8,
      author: 'Sarah Johnson',
      lastUpdated: '2 days ago',
      image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400',
      thumbnail: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=150',
      tags: ['batch-download', 'google-drive', 'optimization'],
      featured: true
    },
    {
      id: 2,
      title: 'Fixing Common Dropbox Download Errors',
      description: 'Troubleshoot and resolve the most frequent Dropbox download issues including authentication failures, rate limiting, and file corruption problems.',
      platform: 'Dropbox',
      category: 'Troubleshooting',
      level: 'beginner',
      contentType: 'troubleshooting',
      readTime: 8,
      views: '8.7K',
      comments: 45,
      rating: 4.6,
      author: 'Mike Chen',
      lastUpdated: '1 day ago',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150',
      tags: ['dropbox', 'errors', 'troubleshooting'],
      featured: false
    },
    {
      id: 3,
      title: 'API Integration Tutorial: Python Examples',
      description: 'Step-by-step tutorial for integrating TaraBox API with Python applications. Includes authentication, file operations, and error handling examples.',
      platform: 'API',
      category: 'API Documentation',
      level: 'advanced',
      contentType: 'tutorial',
      readTime: 25,
      views: '12.3K',
      comments: 67,
      rating: 4.9,
      author: 'Alex Rodriguez',
      lastUpdated: '3 days ago',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=150',
      tags: ['api', 'python', 'integration', 'tutorial'],
      featured: true
    },
    {
      id: 4,
      title: 'Mobile App Setup and Configuration',
      description: 'Complete guide to setting up TaraBox mobile app, configuring download preferences, and managing offline files on iOS and Android devices.',
      platform: 'Mobile',
      category: 'Getting Started',
      level: 'beginner',
      contentType: 'guide',
      readTime: 6,
      views: '22.1K',
      comments: 134,
      rating: 4.7,
      author: 'Emma Wilson',
      lastUpdated: '1 day ago',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150',
      tags: ['mobile', 'setup', 'configuration'],
      featured: false
    },
    {
      id: 5,
      title: 'OneDrive Speed Optimization Techniques',
      description: 'Advanced techniques to maximize download speeds from OneDrive including connection optimization, parallel downloads, and bandwidth management.',
      platform: 'OneDrive',
      category: 'Advanced Techniques',
      level: 'expert',
      contentType: 'guide',
      readTime: 18,
      views: '9.8K',
      comments: 52,
      rating: 4.8,
      author: 'David Kim',
      lastUpdated: '4 days ago',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150',
      tags: ['onedrive', 'speed', 'optimization'],
      featured: false
    },
    {
      id: 6,
      title: 'Browser Extension Installation Guide',
      description: 'Step-by-step instructions for installing and configuring TaraBox browser extensions on Chrome, Firefox, Safari, and Edge browsers.',
      platform: 'Browser',
      category: 'Getting Started',
      level: 'beginner',
      contentType: 'tutorial',
      readTime: 5,
      views: '31.4K',
      comments: 89,
      rating: 4.5,
      author: 'Lisa Park',
      lastUpdated: '2 days ago',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150',
      tags: ['browser', 'extension', 'installation'],
      featured: true
    }
  ];

  // Mock data for popular articles
  const popularArticles = [
    {
      id: 1,
      title: 'Complete Guide to Google Drive Batch Downloads',
      description: 'Learn how to download multiple files efficiently',
      platform: 'Google Drive',
      level: 'intermediate',
      views: 15200,
      readTime: 12,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=150',
      growthRate: 23,
      timeAgo: '2 days ago'
    },
    {
      id: 2,
      title: 'Browser Extension Installation Guide',
      description: 'Step-by-step browser extension setup',
      platform: 'Browser',
      level: 'beginner',
      views: 31400,
      readTime: 5,
      rating: 4.5,
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150',
      growthRate: 45,
      timeAgo: '1 day ago'
    },
    {
      id: 3,
      title: 'Mobile App Setup and Configuration',
      description: 'Complete mobile app configuration guide',
      platform: 'Mobile',
      level: 'beginner',
      views: 22100,
      readTime: 6,
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150',
      growthRate: 18,
      timeAgo: '3 hours ago'
    },
    {
      id: 4,
      title: 'API Integration Tutorial: Python Examples',
      description: 'Python API integration with examples',
      platform: 'API',
      level: 'advanced',
      views: 12300,
      readTime: 25,
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=150',
      growthRate: 67,
      timeAgo: '5 hours ago'
    },
    {
      id: 5,
      title: 'Fixing Common Dropbox Download Errors',
      description: 'Troubleshoot Dropbox download issues',
      platform: 'Dropbox',
      level: 'beginner',
      views: 8700,
      readTime: 8,
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150',
      growthRate: 12,
      timeAgo: '1 day ago'
    }
  ];

  // Filter articles based on search and filters
  useEffect(() => {
    let filtered = allArticles;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply platform filter
    if (selectedFilters.platform !== 'all') {
      filtered = filtered.filter(article =>
        article.platform.toLowerCase().includes(selectedFilters.platform.toLowerCase())
      );
    }

    // Apply level filter
    if (selectedFilters.level !== 'all') {
      filtered = filtered.filter(article => article.level === selectedFilters.level);
    }

    // Apply content type filter
    if (selectedFilters.contentType !== 'all') {
      filtered = filtered.filter(article => article.contentType === selectedFilters.contentType);
    }

    setFilteredArticles(filtered);
  }, [searchQuery, selectedFilters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Filter articles by category
    setSelectedFilters(prev => ({
      ...prev,
      platform: 'all',
      level: 'all',
      contentType: 'all'
    }));
    setSearchQuery('');
  };

  const handleArticleClick = (article) => {
    console.log('Opening article:', article.title);
    // Navigate to article detail page
  };

  const handleQuickLinkClick = (url) => {
    console.log('Navigating to:', url);
    // Navigate to specific page
  };

  const handleContributionClick = (contribution) => {
    console.log('Opening contribution:', contribution?.title || 'New contribution');
    // Navigate to contribution page or form
  };

  const handleForumClick = () => {
    console.log('Opening community forum');
    // Navigate to forum
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFilters({
      platform: 'all',
      level: 'all',
      contentType: 'all'
    });
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-brand text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Icon name="BookOpen" size={32} color="white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Knowledge Base
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Everything you need to master cloud downloads, from basic tutorials to advanced API integration. 
                Get answers, learn techniques, and join our community of power users.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} />
                  <span>247+ Articles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Play" size={16} />
                  <span>89 Video Tutorials</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span>2.8K+ Contributors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Updated Daily</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            searchQuery={searchQuery}
            selectedFilters={selectedFilters}
          />

          {/* Active Filters */}
          {(searchQuery || Object.values(selectedFilters).some(filter => filter !== 'all') || selectedCategory) && (
            <div className="bg-white rounded-lg shadow-elevation-1 p-4 mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
                
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-primary/10 text-brand-primary">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 hover:text-brand-primary/80"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                )}

                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                    Category: {selectedCategory.title}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="ml-2 hover:text-purple-600"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                )}

                {Object.entries(selectedFilters).map(([key, value]) => (
                  value !== 'all' && (
                    <span key={key} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                      {key}: {value}
                      <button
                        onClick={() => handleFilterChange(key, 'all')}
                        className="ml-2 hover:text-gray-600"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </span>
                  )
                ))}

                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1"
                >
                  <Icon name="RotateCcw" size={14} />
                  <span>Clear all</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Categories Grid */}
              {!searchQuery && !selectedCategory && Object.values(selectedFilters).every(filter => filter === 'all') && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
                    <div className="text-sm text-muted-foreground">
                      {categories.length} categories available
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                        onClick={handleCategoryClick}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Grid */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedCategory ? `${selectedCategory.title} Articles` : 
                     searchQuery ? `Search Results` : 'Latest Articles'}
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {filteredArticles.length} articles found
                  </div>
                </div>

                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {filteredArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onClick={handleArticleClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Search" size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="text-brand-primary hover:text-brand-primary/80 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Popular Articles */}
                <PopularArticles
                  articles={popularArticles}
                  onArticleClick={handleArticleClick}
                />

                {/* Quick Links */}
                <QuickLinks onLinkClick={handleQuickLinkClick} />
              </div>
            </div>
          </div>

          {/* Community Section */}
          <CommunitySection
            onContributionClick={handleContributionClick}
            onForumClick={handleForumClick}
          />

          {/* Help Section */}
          <div className="bg-white rounded-xl shadow-elevation-2 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="HelpCircle" size={24} color="white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions 
              or issues you might have with TaraBox Downloader Pro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-primary/90 transition-colors duration-200 flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} />
                <span>Live Chat Support</span>
              </button>
              <button className="border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted/50 transition-colors duration-200 flex items-center space-x-2">
                <Icon name="Mail" size={16} />
                <span>Email Support</span>
              </button>
              <button className="text-brand-primary hover:text-brand-primary/80 font-medium flex items-center space-x-2">
                <Icon name="ExternalLink" size={16} />
                <span>Community Forum</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KnowledgeBase;