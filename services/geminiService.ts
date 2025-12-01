/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the AI Assistant for KHRONOS, a High Performance Training Center.
      
      Tone: Motivational, disciplined, professional, energetic.
      
      Key Info:
      - Location: Vicente Pérez Rosales 1077, Valdivia, Los Ríos
      - Coaches: David Norambuena (Hypertrophy & Strength), Benjamín Weber (Crossfit & Power), Yenifer Quinchao (Functional & Mobility).
      - Hours: Lun-Vie 09:00 - 22:00, Sab 09:00 - 14:00.
      
      Keep responses short and focused on training and membership info.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Systems offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal lost. Try again later.";
  }
};