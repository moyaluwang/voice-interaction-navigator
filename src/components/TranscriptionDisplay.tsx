
import React from 'react';
import { cn } from '@/lib/utils';

interface TranscriptionDisplayProps {
  text: string;
  isActive: boolean;
  className?: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ 
  text, 
  isActive, 
  className 
}) => {
  if (!text && !isActive) return null;
  
  return (
    <div 
      className={cn(
        "absolute bottom-24 left-1/2 -translate-x-1/2 max-w-md w-full px-6 py-4",
        "bg-black/70 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700",
        "transform transition-all duration-300 ease-in-out",
        isActive ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className
      )}
    >
      {isActive && !text && (
        <div className="flex items-center gap-2 text-gray-400 animate-pulse">
          <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          <span className="ml-2">Listening...</span>
        </div>
      )}
      {text && (
        <p className="text-white text-lg animate-fade-in break-words">
          {text}
        </p>
      )}
    </div>
  );
};

export default TranscriptionDisplay;
