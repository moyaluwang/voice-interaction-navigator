
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import TranscriptionDisplay from './TranscriptionDisplay';

export enum VoiceState {
  UNPERMITTED = 'unpermitted',
  IDLING = 'idling',
  LISTENING = 'listening',
  STOPPED = 'stopped',
}

const VoiceInteraction: React.FC = () => {
  const [voiceState, setVoiceState] = useState<VoiceState>(VoiceState.UNPERMITTED);
  const [transcript, setTranscript] = useState<string>('');
  const recognitionRef = useRef<any>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptValue = result[0].transcript;
        setTranscript(transcriptValue);
      };
      
      recognitionRef.current.onend = () => {
        if (voiceState === VoiceState.LISTENING && isMounted.current) {
          handleStateChange(VoiceState.IDLING);
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

  const toggleListening = () => {
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
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } else if (voiceState === VoiceState.LISTENING) {
      handleStateChange(VoiceState.IDLING);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  return (
    <>
      <TranscriptionDisplay 
        text={transcript} 
        isActive={voiceState === VoiceState.LISTENING} 
      />
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <Button 
          onClick={toggleListening}
          variant="outline" 
          size="icon"
          className={`rounded-full w-14 h-14 bg-black/60 border-gray-700 hover:bg-black/80 hover:border-primary
            ${voiceState === VoiceState.LISTENING ? 'bg-primary/20 border-primary animate-pulse' : ''}`}
        >
          {voiceState === VoiceState.UNPERMITTED ? (
            <MicOff className="h-6 w-6 text-gray-400" />
          ) : voiceState === VoiceState.LISTENING ? (
            <Mic className="h-6 w-6 text-primary animate-pulse" />
          ) : (
            <Mic className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>
    </>
  );
};

export default VoiceInteraction;
