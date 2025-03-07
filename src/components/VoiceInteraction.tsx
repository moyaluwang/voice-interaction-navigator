
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export enum VoiceState {
  UNPERMITTED = 'unpermitted',
  IDLING = 'idling',
  LISTENING = 'listening',
  PROCESSING = 'processing',
  RESPONDING = 'responding',
  STOPPED = 'stopped',
}

const stateAnimations = {
  [VoiceState.UNPERMITTED]: 'bg-gray-300 w-16 h-16',
  [VoiceState.IDLING]: 'bg-primary/10 w-16 h-16',
  [VoiceState.LISTENING]: 'bg-primary/30 w-24 h-24 animate-pulse-ring',
  [VoiceState.PROCESSING]: 'bg-primary/50 w-20 h-20 animate-breathe',
  [VoiceState.RESPONDING]: 'bg-accent w-20 h-20 animate-breathe',
  [VoiceState.STOPPED]: 'bg-gray-300 w-16 h-16',
};

const stateIcons = {
  [VoiceState.UNPERMITTED]: <MicOff className="h-6 w-6 text-gray-500" />,
  [VoiceState.IDLING]: <Mic className="h-6 w-6 text-primary" />,
  [VoiceState.LISTENING]: <Mic className="h-8 w-8 text-primary animate-pulse" />,
  [VoiceState.PROCESSING]: <Loader2 className="h-6 w-6 text-primary animate-spin" />,
  [VoiceState.RESPONDING]: <Loader2 className="h-6 w-6 text-accent animate-spin" />,
  [VoiceState.STOPPED]: <MicOff className="h-6 w-6 text-gray-500" />,
};

const stateLabels = {
  [VoiceState.UNPERMITTED]: 'Microphone access needed',
  [VoiceState.IDLING]: 'Click to speak',
  [VoiceState.LISTENING]: 'Listening...',
  [VoiceState.PROCESSING]: 'Processing...',
  [VoiceState.RESPONDING]: 'Responding...',
  [VoiceState.STOPPED]: 'Voice stopped',
};

const stateDescriptions = {
  [VoiceState.UNPERMITTED]: 'Please grant microphone access to use voice features',
  [VoiceState.IDLING]: 'Tap the microphone and start speaking',
  [VoiceState.LISTENING]: 'I\'m listening to your voice',
  [VoiceState.PROCESSING]: 'Processing your request',
  [VoiceState.RESPONDING]: 'Preparing your response',
  [VoiceState.STOPPED]: 'Voice interaction stopped',
};

const VoiceInteraction: React.FC = () => {
  const [voiceState, setVoiceState] = useState<VoiceState>(VoiceState.UNPERMITTED);
  const [transcript, setTranscript] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const rippleIdRef = useRef(0);
  const isMounted = useRef(true);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    // Using type assertion to handle the potentially undefined properties
    const SpeechRecognitionAPI = (window.SpeechRecognition || 
      window.webkitSpeechRecognition) as typeof window.SpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptValue = result[0].transcript;
        setTranscript(transcriptValue);
      };
      
      recognitionRef.current.onend = () => {
        if (voiceState === VoiceState.LISTENING && isMounted.current) {
          handleStateChange(VoiceState.PROCESSING);
          // Simulate processing and response
          setTimeout(() => {
            if (isMounted.current) {
              handleStateChange(VoiceState.RESPONDING);
              const mockResponse = `I heard: "${transcript}". This is a simulated response.`;
              setResponse(mockResponse);
              
              // Return to idle state after responding
              setTimeout(() => {
                if (isMounted.current) {
                  handleStateChange(VoiceState.IDLING);
                }
              }, 3000);
            }
          }, 2000);
        }
      };
      
      // Check for microphone permission
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          if (isMounted.current) {
            handleStateChange(VoiceState.IDLING);
          }
        })
        .catch(() => {
          if (isMounted.current) {
            handleStateChange(VoiceState.UNPERMITTED);
            toast({
              title: "Microphone access denied",
              description: "Please grant microphone access to use voice features",
              variant: "destructive",
            });
          }
        });
    } else {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
    }
    
    return () => {
      isMounted.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const handleStateChange = (newState: VoiceState) => {
    setVoiceState(newState);
  };

  const createRipple = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const id = rippleIdRef.current++;
    setRipples(prev => [...prev, { id, x, y, size }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 800);
  };

  const handleMicClick = (e: React.MouseEvent) => {
    createRipple(e.clientX, e.clientY);
    
    if (voiceState === VoiceState.UNPERMITTED) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          handleStateChange(VoiceState.IDLING);
        })
        .catch(() => {
          toast({
            title: "Microphone access denied",
            description: "Please grant microphone access to use voice features",
            variant: "destructive",
          });
        });
      return;
    }
    
    if (voiceState === VoiceState.IDLING) {
      handleStateChange(VoiceState.LISTENING);
      setTranscript('');
      setResponse('');
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } else if (voiceState === VoiceState.LISTENING) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else if ([VoiceState.PROCESSING, VoiceState.RESPONDING].includes(voiceState)) {
      // Cancel the current process/response
      handleStateChange(VoiceState.IDLING);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 animate-fade-in">
      <div 
        ref={containerRef}
        className="voice-container mb-12 mt-8"
        onClick={handleMicClick}
      >
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="ripple-effect bg-primary/20"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size
            }}
          />
        ))}
        <div 
          className={cn(
            "voice-indicator glass-panel cursor-pointer",
            stateAnimations[voiceState]
          )}
        >
          {stateIcons[voiceState]}
        </div>
      </div>
      
      <h2 className="text-2xl font-medium mb-2 text-center">
        {stateLabels[voiceState]}
      </h2>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        {stateDescriptions[voiceState]}
      </p>
      
      {transcript && (
        <div className="glass-panel p-4 rounded-lg mb-4 max-w-md w-full transform transition-all duration-300 animate-scale-in">
          <p className="text-sm font-medium text-muted-foreground mb-1">You said:</p>
          <p className="text-foreground">{transcript}</p>
        </div>
      )}
      
      {response && (
        <div className="glass-panel p-4 rounded-lg max-w-md w-full transform transition-all duration-300 animate-scale-in">
          <p className="text-sm font-medium text-muted-foreground mb-1">Response:</p>
          <p className="text-foreground">{response}</p>
        </div>
      )}
      
      <div className="mt-8">
        <Button 
          variant="outline" 
          className="text-sm"
          onClick={() => {
            if (voiceState === VoiceState.UNPERMITTED) {
              navigator.mediaDevices.getUserMedia({ audio: true })
                .then(() => handleStateChange(VoiceState.IDLING))
                .catch(() => {
                  toast({
                    title: "Microphone access denied",
                    description: "Please grant microphone access to use voice features",
                    variant: "destructive",
                  });
                });
            }
          }}
        >
          {voiceState === VoiceState.UNPERMITTED ? "Grant Microphone Access" : "Learn How to Use"}
        </Button>
      </div>
    </div>
  );
};

export default VoiceInteraction;
