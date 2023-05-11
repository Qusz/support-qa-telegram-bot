import type { MainContext, Message, GuaranteedElements } from '@/types';

import isSupportAccount from '@/utils/is-support-account';
import TypeGuard from '@/modules/type-control/type-guard';
import TypePredicates from '@/modules/type-control/type-predicates';

import hasAttachments from './has-attachments';

export default function (
  ctx: MainContext
): GuaranteedElements<Message> | undefined {
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
    messageAuthor:
      ctx.message.from.username ??
      ctx.message.from.first_name ??
      ctx.message.from.id.toString(),
    isSupport: null,
    date: ctx.message.date
  };

  if (hasAttachments(ctx)) {
    message.text = 'Вложение';
    // Most likely a system message
  } else if (!hasAttachments(ctx) && !ctx.message.text) {
    return undefined;
  }

  if (!TypeGuard.isValidMessage(message)) {
    throw new Error('Invalid chat data');
  }

  message.isSupport = isSupportAccount(message.messageAuthor);

  return message;
}
