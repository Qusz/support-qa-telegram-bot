import type { MainContext, Message, GuaranteedElements } from '@/types';

import isSupportAccount from '@/utils/is-support-account';
import TypeGuard from '@/modules/type-control/type-guard';
import TypePredicates from '@/modules/type-control/type-predicates';

import hasAttachments from './has-attachments';

export default function (ctx: MainContext): GuaranteedElements<Message> {
  if (!ctx.message) {
    throw new Error('Invalid message instance');
  }

  if (!TypePredicates.notPrivateChat(ctx.message.chat)) {
    throw new Error('Cannot access private chat details');
  }

  const message: Message = {
    chat: ctx.message.chat,
    title: ctx.message.chat.title,
    messageId: ctx.message.message_id,
    text: ctx.message.text,
    messageAuthor: ctx.message.from.username,
    isSupport: null,
    date: ctx.message.date
  };

  /* Message.text returns 'undefined' when there's an attachment */
  /* In case there's no attachment, yet we still cannot get the text content for some reason, payload is changed to error message instead of throwing an error  */
  if (hasAttachments(ctx)) {
    message.text = 'Вложение';
  } else if (!hasAttachments(ctx) && !ctx.message.text) {
    message.text = 'Could not get message content';
  }

  if (!TypeGuard.isValidMessage(message)) {
    throw new Error('Invalid chat data');
  }

  message.isSupport = isSupportAccount(message.messageAuthor);

  return message;
}
