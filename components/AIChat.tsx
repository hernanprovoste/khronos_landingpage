/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bienvenido a KHRONOS. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 100);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-96 bg-[#111] border border-[#F4E028]/30 rounded-none overflow-hidden shadow-[0_0_30px_rgba(244,224,40,0.1)]"
          >
            {/* Header */}
            <div className="bg-[#F4E028] p-4 flex justify-between items-center text-black">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-black" />
                <h3 className="font-heading font-black tracking-tighter uppercase">Khronos AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-black/70 hover:text-black" data-hover="true">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-80 overflow-y-auto p-4 space-y-3 scroll-smooth bg-zinc-900"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-sm font-medium ${
                      msg.role === 'user'
                        ? 'bg-[#F4E028] text-black'
                        : 'bg-[#222] text-gray-200 border-l-2 border-[#F4E028]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#222] p-3 border-l-2 border-[#F4E028] flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#F4E028] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#F4E028] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#F4E028] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-black">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Pregunta sobre planes..."
                  className="flex-1 bg-[#111] text-white placeholder-gray-500 text-sm px-3 focus:outline-none border border-transparent focus:border-[#F4E028] transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#F4E028] p-2 text-black hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  data-hover="true"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#F4E028] flex items-center justify-center shadow-lg shadow-yellow-900/20 z-50 group border border-black"
        data-hover="true"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <MessageCircle className="w-6 h-6 text-black" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;