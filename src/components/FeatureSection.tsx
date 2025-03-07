
import React from 'react';
import { Mic, Sparkles, Zap, Shield, Maximize, Layers } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const FeatureSection: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Intelligent Voice Interaction
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Discover how our voice interface transforms your interaction experience with cutting-edge technology.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <Feature
            icon={<Mic className="h-6 w-6" />}
            title="Natural Language"
            description="Speak naturally with human-like interactions that understand context and intent."
          />
          <Feature
            icon={<Sparkles className="h-6 w-6" />}
            title="Smart Suggestions"
            description="Receive intelligent suggestions based on your voice commands and past interactions."
          />
          <Feature
            icon={<Zap className="h-6 w-6" />}
            title="Instant Response"
            description="Experience lightning-fast processing and response times with minimal latency."
          />
          <Feature
            icon={<Shield className="h-6 w-6" />}
            title="Privacy-Focused"
            description="Your voice data is processed locally with optional cloud features for advanced capabilities."
          />
          <Feature
            icon={<Maximize className="h-6 w-6" />}
            title="Multi-platform"
            description="Use across all your devices with seamless synchronization and consistent experience."
          />
          <Feature
            icon={<Layers className="h-6 w-6" />}
            title="Extensible"
            description="Easily integrate with third-party services and expand functionality as needed."
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
