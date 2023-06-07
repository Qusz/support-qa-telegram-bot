export interface StorageData {
  chatTitle: string;
  chatId: number;
  author: string;
  messageId: number;
  message: string;
  sendAt: Date;
  isPremiumBonus: boolean;
  responseTime: number | null;
  repliedToMessage: number | null;
}
