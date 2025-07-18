import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CustomerSuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      name: "Sarah Chen",
      role: "Video Content Creator",
      company: "Digital Media Studio",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      story: `As a content creator, I was constantly frustrated with slow downloads from cloud storage. Large video files would take hours, and failed downloads meant starting over. TaraBox Premium changed everything - what used to take 6 hours now takes 45 minutes. The batch processing feature lets me queue up entire project folders overnight.`,
      metrics: {
        timeSaved: "85%",
        filesProcessed: "2,400+",
        dataSaved: "1.8 TB"
      },
      useCase: "Large Video File Management",
      icon: "Video"
    },
    {
      name: "Marcus Rodriguez",
      role: "IT Operations Manager",
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      story: `Our team needed to migrate 50GB of client data weekly from various cloud platforms. The free version was limiting our productivity with single-file downloads. Premium's parallel downloading and API integration automated our entire workflow. We've reduced manual work by 90% and eliminated weekend overtime.`,
      metrics: {
        timeSaved: "90%",
        filesProcessed: "15,000+",
        dataSaved: "5.2 TB"
      },
      useCase: "Business Data Migration",
      icon: "Building"
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      company: "University Research Lab",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      story: `Research datasets are massive and time-sensitive. When collaborators share files through various cloud services, download speed becomes critical. TaraBox Premium's scheduled downloads let me queue datasets overnight, and the analytics help me track our data usage patterns for budget planning.`,
      metrics: {
        timeSaved: "75%",
        filesProcessed: "800+",
        dataSaved: "3.1 TB"
      },
      useCase: "Academic Research Data",
      icon: "GraduationCap"
    },
    {
      name: "Alex Thompson",
      role: "Freelance Developer",
      company: "Independent Contractor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      story: `Client projects often involve downloading large repositories and assets from different platforms. The API access has been a game-changer - I've integrated TaraBox into my development workflow. Automated downloads, organized file management, and the ability to resume interrupted downloads have made me more efficient and professional.`,
      metrics: {
        timeSaved: "70%",
        filesProcessed: "5,200+",
        dataSaved: "900 GB"
      },
      useCase: "Development Workflow Integration",
      icon: "Code"
    }
  ];

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const currentStory = stories[activeStory];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">Customer Success Stories</h2>
        <p className="text-muted-foreground">See how professionals are transforming their workflows</p>
      </div>

      <div className="p-6">
        {/* Story Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === activeStory ? 'bg-brand-primary' : 'bg-muted hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={prevStory}
              className="p-2 rounded-lg border border-border hover:bg-muted/20 transition-colors"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={nextStory}
              className="p-2 rounded-lg border border-border hover:bg-muted/20 transition-colors"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>

        {/* Active Story */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Story Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start space-x-4">
              <Image
                src={currentStory.avatar}
                alt={currentStory.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-foreground">{currentStory.name}</h3>
                <p className="text-brand-primary font-medium">{currentStory.role}</p>
                <p className="text-sm text-muted-foreground">{currentStory.company}</p>
              </div>
            </div>

            <div className="bg-muted/20 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Quote" size={20} color="var(--color-brand-primary)" />
                <span className="text-sm font-medium text-brand-primary">Success Story</span>
              </div>
              <p className="text-foreground leading-relaxed">{currentStory.story}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={currentStory.icon} size={20} color="var(--color-brand-primary)" />
              </div>
              <div>
                <div className="font-medium text-foreground">Use Case</div>
                <div className="text-sm text-muted-foreground">{currentStory.useCase}</div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Impact Metrics</h4>
            
            <div className="space-y-4">
              <div className="bg-success/10 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} color="var(--color-success)" />
                  <span className="text-sm font-medium text-success">Time Saved</span>
                </div>
                <div className="text-2xl font-bold text-success">{currentStory.metrics.timeSaved}</div>
                <div className="text-xs text-success/80">Faster than before</div>
              </div>

              <div className="bg-brand-primary/10 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Download" size={16} color="var(--color-brand-primary)" />
                  <span className="text-sm font-medium text-brand-primary">Files Processed</span>
                </div>
                <div className="text-2xl font-bold text-brand-primary">{currentStory.metrics.filesProcessed}</div>
                <div className="text-xs text-brand-primary/80">Successfully downloaded</div>
              </div>

              <div className="bg-purple-100 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="HardDrive" size={16} color="#7C3AED" />
                  <span className="text-sm font-medium text-purple-700">Data Managed</span>
                </div>
                <div className="text-2xl font-bold text-purple-700">{currentStory.metrics.dataSaved}</div>
                <div className="text-xs text-purple-600">Total data processed</div>
              </div>
            </div>

            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Star" size={16} color="var(--color-warning)" />
                <span className="text-sm font-medium text-foreground">Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="Star" size={16} color="var(--color-warning)" fill="var(--color-warning)" />
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-1">5/5 stars</div>
            </div>
          </div>
        </div>

        {/* All Stories Preview */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="font-semibold text-foreground mb-4">More Success Stories</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stories.map((story, index) => (
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                  index === activeStory
                    ? 'border-brand-primary bg-brand-primary/5' :'border-border hover:border-brand-primary/50 hover:bg-muted/20'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Image
                    src={story.avatar}
                    alt={story.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">{story.name}</div>
                    <div className="text-xs text-muted-foreground">{story.role}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{story.useCase}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSuccessStories;