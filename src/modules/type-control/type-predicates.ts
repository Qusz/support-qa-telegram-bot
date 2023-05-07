import type { Chat } from 'grammy/types';

export default class TypePredicates {
  static notPrivateChat(
    chat: Chat.PrivateChat | Chat.GroupChat | Chat.SupergroupChat
  ): chat is Chat.GroupChat | Chat.SupergroupChat {
    return chat.type !== 'private';
  }

  static isValidString(string: string | undefined): string is string {
    return typeof string === 'string';
  }

  static isValidNumber(number: number | undefined): number is number {
    return typeof number === 'number';
  }
}
