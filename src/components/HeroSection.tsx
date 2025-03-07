
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-36">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Voice Interaction Navigator
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Speak naturally. Navigate effortlessly.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Experience a new way to interact with your digital world through seamless voice commands and natural language navigation.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="h-11 px-6 gap-2 group">
                <span>Try it now</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="h-11 px-6">
                Learn more
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="glass-panel rounded-xl p-0.5 sm:p-1 md:p-1.5 lg:p-2 xl:p-2.5 w-full max-w-[400px]">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full">
                  <div className="flex justify-between items-center">
                    <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                    <div className="w-20 h-2 rounded-full bg-muted"></div>
                  </div>
                  <div className="flex flex-col items-center justify-center mt-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-primary/40"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-2 rounded-full bg-muted"></div>
                    <div className="w-5/6 h-2 rounded-full bg-muted"></div>
                    <div className="w-4/6 h-2 rounded-full bg-muted"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
