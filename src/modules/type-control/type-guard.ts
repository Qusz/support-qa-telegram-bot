import type { Message, GuaranteedElements } from '@/types';

import TypePredicates from './type-predicates';

export default class TypeGuard {
  static isValidMessage(
    chatData: Message | GuaranteedElements<Message>
  ): chatData is GuaranteedElements<Message> {
    return (
      TypePredicates.isValidString(chatData.title) &&
      TypePredicates.isValidString(chatData.messageAuthor)
    );
  }
}
