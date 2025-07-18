import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Download Completed',
      message: 'Project_Presentation_Final.pptx has been downloaded successfully',
      timestamp: '2025-07-18T01:15:00',
      read: false,
      action: 'View File'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Available',
      message: 'Batch processing is now available for Premium users. Process up to 50 files simultaneously.',
      timestamp: '2025-07-18T00:30:00',
      read: false,
      action: 'Learn More'
    },
    {
      id: 3,
      type: 'warning',
      title: 'API Limit Warning',
      message: 'You have used 80% of your monthly API calls. Consider upgrading your plan.',
      timestamp: '2025-07-17T23:45:00',
      read: true,
      action: 'Upgrade'
    },
    {
      id: 4,
      type: 'error',
      title: 'Download Failed',
      message: 'Client_Documents_Bundle.pdf failed to download. The file may have been moved or deleted.',
      timestamp: '2025-07-17T22:20:00',
      read: true,
      action: 'Retry'
    },
    {
      id: 5,
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on July 20th from 2:00 AM to 4:00 AM UTC. Some features may be unavailable.',
      timestamp: '2025-07-17T20:00:00',
      read: true,
      action: 'Details'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-brand-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'success': return 'bg-success/10';
      case 'error': return 'bg-error/10';
      case 'warning': return 'bg-warning/10';
      case 'info': return 'bg-brand-primary/10';
      default: return 'bg-muted/10';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleNotificationAction = (notification) => {
    console.log('Notification action:', notification.action, notification.id);
    markAsRead(notification.id);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-md border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <div className="w-6 h-6 bg-error rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">{unreadCount}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto">
        {[
          { key: 'all', label: 'All', count: notifications.length },
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'success', label: 'Success', count: notifications.filter(n => n.type === 'success').length },
          { key: 'warning', label: 'Warnings', count: notifications.filter(n => n.type === 'warning').length },
          { key: 'error', label: 'Errors', count: notifications.filter(n => n.type === 'error').length }
        ].map((tab) => (
          <Button
            key={tab.key}
            variant={filter === tab.key ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter(tab.key)}
            className="whitespace-nowrap"
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 text-xs bg-muted-foreground/20 px-2 py-1 rounded-full">
                {tab.count}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                notification.read 
                  ? 'border-border bg-background' :'border-brand-primary/20 bg-brand-primary/5'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getNotificationBg(notification.type)}`}>
                  <Icon 
                    name={getNotificationIcon(notification.type)} 
                    size={20} 
                    className={getNotificationColor(notification.type)}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-3 ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleNotificationAction(notification)}
                    >
                      {notification.action}
                    </Button>
                    
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notification Settings */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Manage your notification preferences
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;