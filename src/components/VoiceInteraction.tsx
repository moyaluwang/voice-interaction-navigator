
import React, { useState, useEffect, useRef } from 'react';
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
          // Restart recognition when it ends while still in listening state
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        }
      };
      
      // Check for microphone permission
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          if (isMounted.current) {
            handleStateChange(VoiceState.IDLING);
            // Auto-start listening when the component mounts
            startListening();
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

  const startListening = () => {
    if (voiceState === VoiceState.UNPERMITTED) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          handleStateChange(VoiceState.LISTENING);
          setTranscript('');
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
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
    
    handleStateChange(VoiceState.LISTENING);
    setTranscript('');
    
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    handleStateChange(VoiceState.IDLING);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Auto-toggle listening when clicking anywhere
  useEffect(() => {
    const handleDocumentClick = () => {
      if (voiceState === VoiceState.IDLING) {
        startListening();
      } else if (voiceState === VoiceState.LISTENING) {
        stopListening();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [voiceState]);

  return (
    <TranscriptionDisplay 
      text={transcript} 
      isActive={voiceState === VoiceState.LISTENING} 
    />
  );
};

export default VoiceInteraction;
