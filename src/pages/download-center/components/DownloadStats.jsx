import React from 'react';
import Icon from '../../../components/AppIcon';

const DownloadStats = ({ downloads }) => {
  const calculateStats = () => {
    const totalDownloads = downloads.length;
    const activeDownloads = downloads.filter(d => d.status === 'downloading').length;
    const completedDownloads = downloads.filter(d => d.status === 'completed').length;
    const failedDownloads = downloads.filter(d => d.status === 'failed').length;
    
    const totalSize = downloads.reduce((sum, d) => sum + d.totalSize, 0);
    const downloadedSize = downloads.reduce((sum, d) => sum + d.downloadedSize, 0);
    
    const totalSpeed = downloads
      .filter(d => d.status === 'downloading')
      .reduce((sum, d) => sum + (d.speed || 0), 0);
    
    const avgSpeed = activeDownloads > 0 ? totalSpeed / activeDownloads : 0;
    
    return {
      totalDownloads,
      activeDownloads,
      completedDownloads,
      failedDownloads,
      totalSize,
      downloadedSize,
      totalSpeed,
      avgSpeed,
      completionRate: totalDownloads > 0 ? (completedDownloads / totalDownloads) * 100 : 0
    };
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatSpeed = (bytesPerSecond) => {
    if (!bytesPerSecond) return '0 B/s';
    return formatFileSize(bytesPerSecond) + '/s';
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Total Downloads',
      value: stats.totalDownloads,
      icon: 'Download',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12 today'
    },
    {
      title: 'Active Downloads',
      value: stats.activeDownloads,
      icon: 'Activity',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: stats.activeDownloads > 0 ? 'In progress' : 'None active'
    },
    {
      title: 'Completed',
      value: stats.completedDownloads,
      icon: 'CheckCircle',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: `${stats.completionRate.toFixed(1)}% success rate`
    },
    {
      title: 'Failed',
      value: stats.failedDownloads,
      icon: 'XCircle',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: stats.failedDownloads > 0 ? 'Needs attention' : 'All good'
    }
  ];

  const performanceStats = [
    {
      title: 'Total Size',
      value: formatFileSize(stats.totalSize),
      icon: 'HardDrive',
      color: 'text-purple-600'
    },
    {
      title: 'Downloaded',
      value: formatFileSize(stats.downloadedSize),
      icon: 'Download',
      color: 'text-blue-600'
    },
    {
      title: 'Current Speed',
      value: formatSpeed(stats.totalSpeed),
      icon: 'Zap',
      color: 'text-yellow-600'
    },
    {
      title: 'Average Speed',
      value: formatSpeed(stats.avgSpeed),
      icon: 'TrendingUp',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceStats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={stat.icon} size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-lg font-semibold text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Overview */}
      {stats.totalSize > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Overall Progress</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Progress</span>
              <span className="font-medium text-foreground">
                {((stats.downloadedSize / stats.totalSize) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-brand-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${(stats.downloadedSize / stats.totalSize) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatFileSize(stats.downloadedSize)} downloaded</span>
              <span>{formatFileSize(stats.totalSize - stats.downloadedSize)} remaining</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <Icon name="Play" size={20} className="text-green-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Resume All</p>
              <p className="text-xs text-muted-foreground">Start paused downloads</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <Icon name="Pause" size={20} className="text-yellow-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Pause All</p>
              <p className="text-xs text-muted-foreground">Pause active downloads</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <Icon name="Trash2" size={20} className="text-red-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Clear Completed</p>
              <p className="text-xs text-muted-foreground">Remove finished downloads</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadStats;