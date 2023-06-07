import type { Chat } from 'grammy/types';

export interface Message {
  chat: Chat.PrivateChat | Chat.GroupChat | Chat.SupergroupChat;
  chatId: number;
  title: string | undefined;
  messageAuthor: string | undefined;
  messageId: number;
  text: string | undefined;
  date: number;
  isSupport: boolean | null;
}
