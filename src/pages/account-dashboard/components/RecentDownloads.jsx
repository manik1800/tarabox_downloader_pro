import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentDownloads = () => {
  const [downloads] = useState([
    {
      id: 1,
      fileName: "Project_Presentation_Final.pptx",
      fileSize: "45.2 MB",
      platform: "Google Drive",
      downloadDate: "2025-07-18T00:45:00",
      status: "completed",
      downloadSpeed: "12.3 MB/s",
      originalUrl: "https://drive.google.com/file/d/1abc123...",
      thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      fileName: "Marketing_Assets_Q3.zip",
      fileSize: "128.7 MB",
      platform: "Dropbox",
      downloadDate: "2025-07-17T23:20:00",
      status: "completed",
      downloadSpeed: "8.9 MB/s",
      originalUrl: "https://dropbox.com/s/xyz789...",
      thumbnail: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      fileName: "Video_Tutorial_Series.mp4",
      fileSize: "2.1 GB",
      platform: "OneDrive",
      downloadDate: "2025-07-17T22:15:00",
      status: "completed",
      downloadSpeed: "15.7 MB/s",
      originalUrl: "https://onedrive.live.com/redir?resid=...",
      thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      fileName: "Client_Documents_Bundle.pdf",
      fileSize: "23.8 MB",
      platform: "Box",
      downloadDate: "2025-07-17T21:30:00",
      status: "failed",
      downloadSpeed: "0 MB/s",
      originalUrl: "https://app.box.com/s/abc456...",
      thumbnail: "https://images.unsplash.com/photo-1568667256549-094345857637?w=100&h=100&fit=crop"
    },
    {
      id: 5,
      fileName: "Design_Templates_Collection.sketch",
      fileSize: "89.4 MB",
      platform: "Google Drive",
      downloadDate: "2025-07-17T20:45:00",
      status: "completed",
      downloadSpeed: "11.2 MB/s",
      originalUrl: "https://drive.google.com/file/d/2def456...",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop"
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'failed': return 'XCircle';
      case 'downloading': return 'Download';
      default: return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'failed': return 'text-error';
      case 'downloading': return 'text-brand-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Google Drive': return 'HardDrive';
      case 'Dropbox': return 'Cloud';
      case 'OneDrive': return 'CloudDrizzle';
      case 'Box': return 'Package';
      default: return 'Folder';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const handleRedownload = (download) => {
    console.log('Redownloading:', download.fileName);
  };

  const handleShare = (download) => {
    console.log('Sharing:', download.fileName);
  };

  const handleDelete = (downloadId) => {
    console.log('Deleting download:', downloadId);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-md border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Downloads</h2>
        <Button variant="ghost" size="sm">
          <Icon name="MoreHorizontal" size={16} className="mr-2" />
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {downloads.map((download) => (
          <div key={download.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-200">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={download.thumbnail} 
                alt={download.fileName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-foreground truncate">{download.fileName}</h3>
                <Icon 
                  name={getStatusIcon(download.status)} 
                  size={16} 
                  className={getStatusColor(download.status)}
                />
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name={getPlatformIcon(download.platform)} size={14} />
                  <span>{download.platform}</span>
                </div>
                <span>{download.fileSize}</span>
                <span>{formatDate(download.downloadDate)}</span>
                {download.status === 'completed' && (
                  <span className="text-success">{download.downloadSpeed}</span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {download.status === 'completed' && (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRedownload(download)}
                  >
                    <Icon name="RotateCcw" size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleShare(download)}
                  >
                    <Icon name="Share2" size={16} />
                  </Button>
                </>
              )}
              {download.status === 'failed' && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRedownload(download)}
                >
                  <Icon name="RefreshCw" size={16} />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDelete(download.id)}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing 5 of 247 downloads</span>
          <Button variant="outline" size="sm">
            <Icon name="Archive" size={16} className="mr-2" />
            View Archive
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentDownloads;