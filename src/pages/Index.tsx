
import React from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import VoiceInteraction from '@/components/VoiceInteraction';
import FeatureSection from '@/components/FeatureSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        <HeroSection />
        
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Try Voice Interaction
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Experience the power of our voice interface directly in your browser.
                </p>
              </div>
            </div>
            
            <div className="mx-auto max-w-3xl mt-12">
              <div className="glass-panel rounded-xl p-1">
                <VoiceInteraction />
              </div>
            </div>
          </div>
        </section>
        
        <FeatureSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
