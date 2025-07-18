import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStartGuide = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);

  const steps = [
    {
      id: 'signup',
      title: 'Create Developer Account',
      description: 'Sign up for a free developer account to get your API credentials',
      code: `// No code required - just visit our developer portal
https://api.tarabox.com/developer/signup`,
      language: 'bash'
    },
    {
      id: 'auth',
      title: 'Get API Key',
      description: 'Generate your API key from the developer dashboard',
      code: `curl -X POST https://api.tarabox.com/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "grant_type": "client_credentials"
  }'`,
      language: 'bash'
    },
    {
      id: 'first-request',
      title: 'Make Your First Request',
      description: 'Test your integration with a simple download request',
      code: `const response = await fetch('https://api.tarabox.com/v1/download', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com/file.zip',
    options: {
      quality: 'high',
      format: 'original'
    }
  })
});

const result = await response.json();
console.log(result);`,
      language: 'javascript'
    },
    {
      id: 'handle-response',
      title: 'Handle Response',
      description: 'Process the download response and track progress',
      code: `{
  "success": true,
  "download_id": "dl_abc123",
  "status": "processing",
  "download_url": "https://cdn.tarabox.com/downloads/abc123.zip",
  "expires_at": "2025-07-18T02:28:43Z",
  "metadata": {
    "original_size": "256MB",
    "compressed_size": "198MB",
    "format": "zip"
  }
}`,
      language: 'json'
    }
  ];

  const copyToClipboard = (code, stepId) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(stepId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
            <Icon name="Rocket" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Quick Start Guide</h2>
            <p className="text-sm text-muted-foreground">Get up and running in 5 minutes</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer ${
                    index <= activeStep 
                      ? 'bg-brand-primary text-white shadow-brand' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {index < activeStep ? (
                    <Icon name="Check" size={16} color="white" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      index < activeStep ? 'bg-brand-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Step {activeStep + 1} of {steps.length}
            </span>
          </div>
        </div>

        {/* Current Step Content */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {steps[activeStep].title}
            </h3>
            <p className="text-muted-foreground">
              {steps[activeStep].description}
            </p>
          </div>

          {/* Code Block */}
          <div className="relative">
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 uppercase font-mono">
                    {steps[activeStep].language}
                  </span>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => copyToClipboard(steps[activeStep].code, steps[activeStep].id)}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedCode === steps[activeStep].id ? (
                      <Icon name="Check" size={14} />
                    ) : (
                      <Icon name="Copy" size={14} />
                    )}
                  </Button>
                </div>
              </div>
              <pre className="p-4 text-sm text-slate-100 overflow-x-auto">
                <code>{steps[activeStep].code}</code>
              </pre>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeStep ? 'bg-brand-primary' : 'bg-border'
                  }`}
                  onClick={() => setActiveStep(index)}
                />
              ))}
            </div>

            <Button
              variant="default"
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              iconName="ChevronRight"
              iconPosition="right"
              className="bg-brand-primary hover:bg-brand-primary/90"
            >
              {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;