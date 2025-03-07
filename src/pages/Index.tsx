
import React from 'react';
import VoiceInteraction from '@/components/VoiceInteraction';

const Index = () => {
  // Using one of the GIF links provided
  const gifUrl = 'https://www.davebitter.com/img/articles/interacting-with-chat-gpt-through-voice-ui-on-the-web-aiva-listening.gif';

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black relative">
      <img 
        src={gifUrl} 
        alt="Voice UI animation" 
        className="max-h-full max-w-full object-contain"
      />
      <VoiceInteraction />
    </div>
  );
};

export default Index;
