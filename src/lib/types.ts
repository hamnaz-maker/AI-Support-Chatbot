// src/lib/types.ts

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
