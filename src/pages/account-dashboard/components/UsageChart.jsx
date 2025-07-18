import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UsageChart = () => {
  const [chartType, setChartType] = useState('downloads');
  const [timeRange, setTimeRange] = useState('7d');

  const downloadData = [
    { name: 'Mon', downloads: 12, bandwidth: 2.4, timeSaved: 45 },
    { name: 'Tue', downloads: 19, bandwidth: 3.8, timeSaved: 67 },
    { name: 'Wed', downloads: 8, bandwidth: 1.6, timeSaved: 28 },
    { name: 'Thu', downloads: 15, bandwidth: 3.2, timeSaved: 52 },
    { name: 'Fri', downloads: 22, bandwidth: 4.1, timeSaved: 78 },
    { name: 'Sat', downloads: 6, bandwidth: 1.2, timeSaved: 21 },
    { name: 'Sun', downloads: 11, bandwidth: 2.1, timeSaved: 38 }
  ];

  const bandwidthData = [
    { name: 'Mon', used: 2.4, saved: 1.8 },
    { name: 'Tue', used: 3.8, saved: 2.9 },
    { name: 'Wed', used: 1.6, saved: 1.2 },
    { name: 'Thu', used: 3.2, saved: 2.4 },
    { name: 'Fri', used: 4.1, saved: 3.1 },
    { name: 'Sat', used: 1.2, saved: 0.9 },
    { name: 'Sun', used: 2.1, saved: 1.6 }
  ];

  const speedData = [
    { name: 'Mon', speed: 8.2, improvement: 340 },
    { name: 'Tue', speed: 12.4, improvement: 420 },
    { name: 'Wed', speed: 6.8, improvement: 280 },
    { name: 'Thu', speed: 10.1, improvement: 380 },
    { name: 'Fri', speed: 15.7, improvement: 520 },
    { name: 'Sat', speed: 5.4, improvement: 220 },
    { name: 'Sun', speed: 9.3, improvement: 350 }
  ];

  const chartConfigs = {
    downloads: {
      title: 'Download Activity',
      data: downloadData,
      dataKey: 'downloads',
      color: 'var(--color-brand-primary)',
      unit: 'files'
    },
    bandwidth: {
      title: 'Bandwidth Usage',
      data: bandwidthData,
      dataKey: 'used',
      color: 'var(--color-brand-secondary)',
      unit: 'GB'
    },
    speed: {
      title: 'Download Speed',
      data: speedData,
      dataKey: 'speed',
      color: 'var(--color-success)',
      unit: 'MB/s'
    }
  };

  const currentConfig = chartConfigs[chartType];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <p className="text-sm text-muted-foreground">
            {`${payload[0].value} ${currentConfig.unit}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-md border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Usage Analytics</h2>
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={timeRange === '7d' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('7d')}
              className="text-xs"
            >
              7D
            </Button>
            <Button
              variant={timeRange === '30d' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('30d')}
              className="text-xs"
            >
              30D
            </Button>
            <Button
              variant={timeRange === '90d' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('90d')}
              className="text-xs"
            >
              90D
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant={chartType === 'downloads' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setChartType('downloads')}
        >
          <Icon name="Download" size={16} className="mr-2" />
          Downloads
        </Button>
        <Button
          variant={chartType === 'bandwidth' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setChartType('bandwidth')}
        >
          <Icon name="Wifi" size={16} className="mr-2" />
          Bandwidth
        </Button>
        <Button
          variant={chartType === 'speed' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setChartType('speed')}
        >
          <Icon name="Zap" size={16} className="mr-2" />
          Speed
        </Button>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'downloads' ? (
            <BarChart data={currentConfig.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={currentConfig.dataKey} 
                fill={currentConfig.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : chartType === 'bandwidth' ? (
            <AreaChart data={currentConfig.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone"
                dataKey={currentConfig.dataKey}
                stroke={currentConfig.color}
                fill={currentConfig.color}
                fillOpacity={0.3}
              />
            </AreaChart>
          ) : (
            <LineChart data={currentConfig.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone"
                dataKey={currentConfig.dataKey}
                stroke={currentConfig.color}
                strokeWidth={3}
                dot={{ fill: currentConfig.color, strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-primary">93</div>
            <div className="text-sm text-muted-foreground">Total Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-secondary">18.2 GB</div>
            <div className="text-sm text-muted-foreground">Data Transferred</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">329 min</div>
            <div className="text-sm text-muted-foreground">Time Saved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageChart;