import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RateLimiting = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const rateLimits = [
    {
      plan: 'Free',
      color: 'bg-slate-500',
      limits: {
        requests: '100/hour',
        downloads: '10/day',
        bandwidth: '1GB/day',
        concurrent: '2'
      },
      features: ['Basic API access', 'Community support', 'Standard quality downloads']
    },
    {
      plan: 'Pro',
      color: 'bg-brand-primary',
      limits: {
        requests: '1,000/hour',
        downloads: '100/day',
        bandwidth: '50GB/day',
        concurrent: '10'
      },
      features: ['Priority processing', 'High quality downloads', 'Email support', 'Webhook notifications']
    },
    {
      plan: 'Business',
      color: 'bg-brand-secondary',
      limits: {
        requests: '10,000/hour',
        downloads: '1,000/day',
        bandwidth: '500GB/day',
        concurrent: '50'
      },
      features: ['Bulk operations', 'Custom integrations', 'Dedicated support', 'SLA guarantee']
    },
    {
      plan: 'Enterprise',
      color: 'bg-brand-accent',
      limits: {
        requests: 'Custom',
        downloads: 'Unlimited',
        bandwidth: 'Unlimited',
        concurrent: 'Custom'
      },
      features: ['Custom rate limits', 'White-label API', 'On-premise deployment', '24/7 support']
    }
  ];

  const headerExamples = {
    request: `GET /v1/download HTTP/1.1
Host: api.tarabox.com
Authorization: Bearer your_api_key
Content-Type: application/json`,
    
    response: `HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642694400
X-RateLimit-Window: 3600

{
  "success": true,
  "download_id": "dl_abc123",
  "status": "processing"
}`,

    exceeded: `HTTP/1.1 429 Too Many Requests
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1642694400
X-RateLimit-Window: 3600
Retry-After: 300

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 5 minutes.",
    "details": {
      "limit": 1000,
      "window": "1 hour",
      "reset_at": "2025-07-18T02:00:00Z"
    }
  }
}`
  };

  const bestPractices = [
    {
      title: 'Implement Exponential Backoff',
      description: 'When you receive a 429 response, wait progressively longer between retries',
      code: `// JavaScript example
async function apiCallWithBackoff(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, i) * 1000;
        
        console.log(\`Rate limited. Waiting \${delay}ms before retry \${i + 1}\`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}`
    },
    {
      title: 'Monitor Rate Limit Headers',
      description: 'Always check the rate limit headers to avoid hitting limits',
      code: `// Check rate limit headers
const response = await fetch('/v1/download', options);

const limit = response.headers.get('X-RateLimit-Limit');
const remaining = response.headers.get('X-RateLimit-Remaining');
const reset = response.headers.get('X-RateLimit-Reset');

console.log(\`Rate limit: \${remaining}/\${limit} remaining\`);
console.log(\`Resets at: \${new Date(reset * 1000)}\`);

// Warn when approaching limit
if (remaining < limit * 0.1) {
  console.warn('Approaching rate limit!');
}`
    },
    {
      title: 'Use Batch Operations',
      description: 'Combine multiple operations into single API calls when possible',
      code: `// Instead of multiple single downloads
// ❌ Don't do this
for (const url of urls) {
  await client.download(url);
}

// ✅ Use batch operations
const batchResponse = await client.batchDownload({
  urls: urls.map(url => ({ url, quality: 'high' })),
  webhook_url: 'https://your-app.com/webhook'
});`
    },
    {
      title: 'Implement Request Queuing',description: 'Queue requests locally to stay within rate limits',
      code: `class RateLimitedClient {
  constructor(apiKey, requestsPerHour = 1000) {
    this.apiKey = apiKey;
    this.requestsPerHour = requestsPerHour;
    this.queue = [];
    this.processing = false;
  }
  
  async request(url, options) {
    return new Promise((resolve, reject) => {
      this.queue.push({ url, options, resolve, reject });
      this.processQueue();
    });
  }
  
  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    const delay = 3600000 / this.requestsPerHour; // ms between requests
    
    while (this.queue.length > 0) {
      const { url, options, resolve, reject } = this.queue.shift();
      
      try {
        const response = await fetch(url, options);
        resolve(response);
      } catch (error) {
        reject(error);
      }
      
      if (this.queue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    this.processing = false;
  }
}`
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-gradient-to-r from-warning/5 to-brand-primary/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Rate Limiting</h2>
            <p className="text-sm text-muted-foreground">API usage limits and best practices</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'overview', name: 'Overview', icon: 'BarChart3' },
            { id: 'headers', name: 'Headers', icon: 'FileText' },
            { id: 'practices', name: 'Best Practices', icon: 'Lightbulb' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-brand-primary text-white shadow-brand'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-brand-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Rate Limiting Overview</p>
                  <p className="text-muted-foreground">
                    Our API uses a sliding window rate limiting system to ensure fair usage and optimal performance for all users. 
                    Rate limits are applied per API key and reset automatically based on your plan's window period.
                  </p>
                </div>
              </div>
            </div>

            {/* Rate Limit Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rateLimits.map((plan, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden">
                  <div className={`${plan.color} p-4 text-white`}>
                    <h3 className="font-semibold text-lg">{plan.plan}</h3>
                    <p className="text-sm opacity-90">
                      {plan.plan === 'Free' ? 'Get started' : 
                       plan.plan === 'Enterprise' ? 'Custom solution' : 'Most popular'}
                    </p>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Requests/hour:</span>
                        <span className="font-medium text-foreground">{plan.limits.requests}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Downloads/day:</span>
                        <span className="font-medium text-foreground">{plan.limits.downloads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bandwidth/day:</span>
                        <span className="font-medium text-foreground">{plan.limits.bandwidth}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Concurrent:</span>
                        <span className="font-medium text-foreground">{plan.limits.concurrent}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <ul className="space-y-1">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Icon name="Check" size={12} className="text-success" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rate Limit Calculation */}
            <div className="bg-muted/20 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">How Rate Limits Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Sliding Window</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Rate limits use a sliding window approach. For example, with a 1000/hour limit, 
                    you can make 1000 requests in any 60-minute period, not just within a fixed hour.
                  </p>
                  <div className="bg-white rounded border p-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>12:00</span>
                      <span>12:30</span>
                      <span>13:00</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-brand-primary rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">750/1000 requests used</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Multiple Limits</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Different limits apply to different resources. API calls, downloads, and bandwidth 
                    are tracked separately to ensure optimal service quality.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">API Calls:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-brand-primary rounded-full" style={{width: '60%'}}></div>
                        </div>
                        <span className="text-foreground font-medium">600/1000</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Downloads:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-brand-secondary rounded-full" style={{width: '30%'}}></div>
                        </div>
                        <span className="text-foreground font-medium">30/100</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Bandwidth:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-warning rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-foreground font-medium">42.5/50GB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Headers Tab */}
        {activeTab === 'headers' && (
          <div className="space-y-6">
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-brand-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Rate Limit Headers</p>
                  <p className="text-muted-foreground">
                    Every API response includes headers that help you track your current usage and avoid hitting rate limits.
                  </p>
                </div>
              </div>
            </div>

            {/* Header Examples */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Successful Request</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Request</h4>
                    <div className="bg-slate-900 rounded-lg overflow-hidden">
                      <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
                        <span className="text-xs text-slate-400 font-mono">REQUEST</span>
                      </div>
                      <pre className="p-4 text-sm text-slate-100 overflow-x-auto">
                        <code>{headerExamples.request}</code>
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Response</h4>
                    <div className="bg-slate-900 rounded-lg overflow-hidden">
                      <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
                        <span className="text-xs text-slate-400 font-mono">RESPONSE</span>
                      </div>
                      <pre className="p-4 text-sm text-slate-100 overflow-x-auto">
                        <code>{headerExamples.response}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Rate Limit Exceeded</h3>
                <div className="bg-slate-900 rounded-lg overflow-hidden">
                  <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <span className="text-xs text-slate-400 font-mono">429 RESPONSE</span>
                  </div>
                  <pre className="p-4 text-sm text-slate-100 overflow-x-auto">
                    <code>{headerExamples.exceeded}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Header Descriptions */}
            <div className="bg-muted/20 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Header Descriptions</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded text-brand-primary font-mono">X-RateLimit-Limit</code>
                  <p className="text-sm text-muted-foreground">The maximum number of requests allowed in the current window</p>
                </div>
                <div className="flex items-start space-x-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded text-brand-primary font-mono">X-RateLimit-Remaining</code>
                  <p className="text-sm text-muted-foreground">The number of requests remaining in the current window</p>
                </div>
                <div className="flex items-start space-x-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded text-brand-primary font-mono">X-RateLimit-Reset</code>
                  <p className="text-sm text-muted-foreground">Unix timestamp when the rate limit window resets</p>
                </div>
                <div className="flex items-start space-x-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded text-brand-primary font-mono">X-RateLimit-Window</code>
                  <p className="text-sm text-muted-foreground">The length of the rate limit window in seconds</p>
                </div>
                <div className="flex items-start space-x-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded text-brand-primary font-mono">Retry-After</code>
                  <p className="text-sm text-muted-foreground">Seconds to wait before making another request (only in 429 responses)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Best Practices Tab */}
        {activeTab === 'practices' && (
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <div className="p-4 bg-muted/20 border-b border-border">
                  <h3 className="font-semibold text-foreground mb-2">{practice.title}</h3>
                  <p className="text-sm text-muted-foreground">{practice.description}</p>
                </div>
                <div className="bg-slate-900 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <span className="text-xs text-slate-400 font-mono">EXAMPLE</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => navigator.clipboard.writeText(practice.code)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Icon name="Copy" size={12} />
                    </Button>
                  </div>
                  <pre className="p-4 text-sm text-slate-100 overflow-x-auto">
                    <code>{practice.code}</code>
                  </pre>
                </div>
              </div>
            ))}

            {/* Additional Tips */}
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={16} className="text-brand-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-2">Additional Tips</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Cache API responses when possible to reduce unnecessary calls</li>
                    <li>• Use webhooks instead of polling for status updates</li>
                    <li>• Implement circuit breakers to handle extended rate limit periods</li>
                    <li>• Monitor your usage patterns and upgrade your plan proactively</li>
                    <li>• Consider using multiple API keys for different parts of your application</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RateLimiting;