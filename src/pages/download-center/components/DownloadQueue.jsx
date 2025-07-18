import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DownloadQueue = ({ downloads, onPause, onResume, onCancel, onRetry, onRemove }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const getStatusColor = (status) => {
    switch (status) {
      case 'downloading': return 'text-blue-600';
      case 'completed': return 'text-green-600';
      case 'paused': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      case 'queued': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'downloading': return 'Download';
      case 'completed': return 'CheckCircle';
      case 'paused': return 'Pause';
      case 'failed': return 'XCircle';
      case 'queued': return 'Clock';
      default: return 'Clock';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatSpeed = (bytesPerSecond) => {
    if (!bytesPerSecond) return '0 B/s';
    return formatFileSize(bytesPerSecond) + '/s';
  };

  const formatTime = (seconds) => {
    if (!seconds || seconds === Infinity) return '--:--';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredDownloads = downloads.filter(download => {
    if (filter === 'all') return true;
    return download.status === filter;
  });

  const sortedDownloads = [...filteredDownloads].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'name':
        return a.fileName.localeCompare(b.fileName);
      case 'size':
        return b.totalSize - a.totalSize;
      default:
        return 0;
    }
  });

  const filterOptions = [
    { value: 'all', label: 'All Downloads', count: downloads.length },
    { value: 'downloading', label: 'Active', count: downloads.filter(d => d.status === 'downloading').length },
    { value: 'completed', label: 'Completed', count: downloads.filter(d => d.status === 'completed').length },
    { value: 'paused', label: 'Paused', count: downloads.filter(d => d.status === 'paused').length },
    { value: 'failed', label: 'Failed', count: downloads.filter(d => d.status === 'failed').length }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Download Queue</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === option.value
                  ? 'bg-brand-primary text-white' :'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {option.label}
              {option.count > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${
                  filter === option.value
                    ? 'bg-white/20 text-white' :'bg-background text-muted-foreground'
                }`}>
                  {option.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-border rounded-md px-2 py-1 bg-background"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">File Name</option>
            <option value="size">File Size</option>
          </select>
        </div>
      </div>

      {/* Download List */}
      <div className="max-h-96 overflow-y-auto">
        {sortedDownloads.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Download" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No downloads found</h3>
            <p className="text-muted-foreground">
              {filter === 'all' ?'Start downloading files to see them here'
                : `No ${filter} downloads at the moment`
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {sortedDownloads.map(download => (
              <div key={download.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start space-x-4">
                  {/* File Icon/Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="File" size={20} className="text-muted-foreground" />
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-foreground truncate pr-4">
                        {download.fileName}
                      </h4>
                      <div className={`flex items-center space-x-1 ${getStatusColor(download.status)}`}>
                        <Icon name={getStatusIcon(download.status)} size={16} />
                        <span className="text-sm font-medium capitalize">{download.status}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {(download.status === 'downloading' || download.status === 'paused') && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>{Math.round(download.progress)}%</span>
                          <span>{formatFileSize(download.downloadedSize)} / {formatFileSize(download.totalSize)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${download.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Download Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span>Size: {formatFileSize(download.totalSize)}</span>
                        {download.status === 'downloading' && (
                          <>
                            <span>Speed: {formatSpeed(download.speed)}</span>
                            <span>ETA: {formatTime(download.eta)}</span>
                          </>
                        )}
                        {download.status === 'completed' && (
                          <span>Completed: {new Date(download.completedAt).toLocaleString()}</span>
                        )}
                      </div>
                      <span className="text-muted-foreground">
                        {new Date(download.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Source URL */}
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground truncate">
                        From: {download.sourceUrl}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex items-center space-x-1">
                    {download.status === 'downloading' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPause(download.id)}
                      >
                        <Icon name="Pause" size={16} />
                      </Button>
                    )}
                    {download.status === 'paused' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onResume(download.id)}
                      >
                        <Icon name="Play" size={16} />
                      </Button>
                    )}
                    {download.status === 'failed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRetry(download.id)}
                      >
                        <Icon name="RotateCcw" size={16} />
                      </Button>
                    )}
                    {(download.status === 'downloading' || download.status === 'paused' || download.status === 'queued') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCancel(download.id)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    )}
                    {(download.status === 'completed' || download.status === 'failed') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(download.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadQueue;