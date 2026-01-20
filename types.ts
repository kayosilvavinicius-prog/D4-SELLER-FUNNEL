
export type MessageSender = "system" | "user";
export type MessageStatus = "sent" | "delivered" | "read";

export interface WhatsAppMessage {
  id: number;
  text: string;
  sender: MessageSender;
  status: MessageStatus;
  timestamp: string;
  buttons?: string[]; // Opções interativas dentro da mensagem
}

export type Experience = '1A' | '1B' | '1C' | '2-VSL' | 'DIAGNOSTICO' | 'SALES';
