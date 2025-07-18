import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UrlInput = ({ onAddDownload, isProcessing }) => {
  const [url, setUrl] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlHistory, setUrlHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);
  const inputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Mock supported platforms for validation
  const supportedPlatforms = [
    'drive.google.com',
    'dropbox.com',
    'onedrive.live.com',
    'mega.nz',
    'mediafire.com',
    'wetransfer.com',
    'sendspace.com',
    'zippyshare.com',
    'rapidgator.net',
    'uploaded.net'
  ];

  useEffect(() => {
    // Load URL history from localStorage
    const savedHistory = localStorage.getItem('downloadUrlHistory');
    if (savedHistory) {
      setUrlHistory(JSON.parse(savedHistory));
    }
  }, []);

  const validateUrl = (inputUrl) => {
    if (!inputUrl.trim()) {
      setValidationStatus(null);
      return;
    }

    try {
      const urlObj = new URL(inputUrl);
      const isSupported = supportedPlatforms.some(platform => 
        urlObj.hostname.includes(platform)
      );

      if (isSupported) {
        setValidationStatus({ type: 'success', message: 'Supported platform detected' });
      } else {
        setValidationStatus({ type: 'warning', message: 'Platform may not be supported' });
      }
    } catch {
      setValidationStatus({ type: 'error', message: 'Invalid URL format' });
    }
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    validateUrl(newUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim() || validationStatus?.type === 'error') return;

    // Add to history
    const newHistory = [url, ...urlHistory.filter(h => h !== url)].slice(0, 10);
    setUrlHistory(newHistory);
    localStorage.setItem('downloadUrlHistory', JSON.stringify(newHistory));

    // Process download
    onAddDownload(url);
    setUrl('');
    setValidationStatus(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!dropZoneRef.current?.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedText = e.dataTransfer.getData('text/plain');
    if (droppedText) {
      setUrl(droppedText);
      validateUrl(droppedText);
    }
  };

  const handleHistorySelect = (historicalUrl) => {
    setUrl(historicalUrl);
    validateUrl(historicalUrl);
    setShowHistory(false);
    inputRef.current?.focus();
  };

  const clearHistory = () => {
    setUrlHistory([]);
    localStorage.removeItem('downloadUrlHistory');
    setShowHistory(false);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      validateUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Add Download</h2>
        <p className="text-muted-foreground">
          Paste a URL or drag and drop a link to start downloading
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 mb-6 transition-all duration-200 ${
          isDragOver
            ? 'border-brand-primary bg-brand-primary/5' :'border-border hover:border-brand-primary/50'
        }`}
      >
        <div className="text-center">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isDragOver ? 'bg-brand-primary text-white' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name={isDragOver ? "Download" : "Link"} size={24} />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {isDragOver ? 'Drop URL here' : 'Drag & Drop URL'}
          </h3>
          <p className="text-muted-foreground">
            {isDragOver 
              ? 'Release to add the URL to download queue'
              : 'Drag a download link here or use the input field below'
            }
          </p>
        </div>
      </div>

      {/* URL Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="flex">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://example.com/file-to-download"
                className="w-full px-4 py-3 pr-12 border border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                disabled={isProcessing}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                {validationStatus && (
                  <Icon
                    name={
                      validationStatus.type === 'success' ? 'CheckCircle' :
                      validationStatus.type === 'warning' ? 'AlertTriangle' : 'XCircle'
                    }
                    size={16}
                    className={
                      validationStatus.type === 'success' ? 'text-green-500' :
                      validationStatus.type === 'warning' ? 'text-yellow-500' : 'text-red-500'
                    }
                  />
                )}
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={pasteFromClipboard}
              className="border-l-0 rounded-l-none rounded-r-none border-r-0"
              disabled={isProcessing}
            >
              <Icon name="Clipboard" size={16} />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowHistory(!showHistory)}
              className="border-l-0 rounded-l-none rounded-r-none"
              disabled={isProcessing}
            >
              <Icon name="History" size={16} />
            </Button>
            <Button
              type="submit"
              variant="default"
              className="rounded-l-none bg-brand-primary hover:bg-brand-primary/90"
              disabled={!url.trim() || validationStatus?.type === 'error' || isProcessing}
              loading={isProcessing}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Add Download
            </Button>
          </div>

          {/* Validation Message */}
          {validationStatus && (
            <div className={`mt-2 text-sm flex items-center space-x-2 ${
              validationStatus.type === 'success' ? 'text-green-600' :
              validationStatus.type === 'warning' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              <Icon
                name={
                  validationStatus.type === 'success' ? 'CheckCircle' :
                  validationStatus.type === 'warning' ? 'AlertTriangle' : 'XCircle'
                }
                size={14}
              />
              <span>{validationStatus.message}</span>
            </div>
          )}
        </div>

        {/* URL History Dropdown */}
        {showHistory && urlHistory.length > 0 && (
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 bg-white border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              <div className="p-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Recent URLs</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Trash2" size={14} className="mr-1" />
                  Clear
                </Button>
              </div>
              <div className="py-1">
                {urlHistory.map((historicalUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleHistorySelect(historicalUrl)}
                    className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <div className="truncate">{historicalUrl}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Supported Platforms */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Supported Platforms</h4>
        <div className="flex flex-wrap gap-2">
          {supportedPlatforms.slice(0, 6).map(platform => (
            <span
              key={platform}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {platform}
            </span>
          ))}
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
            +{supportedPlatforms.length - 6} more
          </span>
        </div>
      </div>
    </div>
  );
};

export default UrlInput;