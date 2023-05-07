import type { MainContext } from '@/types';

import insertToMessages from '@/modules/db-control/insert-to-messages';
import SessionControl from '@/modules/session-control/session-control';

import epochToTimestamp from '@/utils/epoch-to-timestamp';
import secondsToMins from '@/utils/seconds-to-mins';

import getChatDetails from './get-chat-details';

export default async function (ctx: MainContext) {
  const message = getChatDetails(ctx);
  const { firstUnrepliedMessageId, firstUnrepliedMessageTime, state } =
    ctx.session;

  let responseTime: null | number = null;
  let repliedTo: null | number = null;

  ctx.session.title = message.title;

  switch (true) {
    // First message from customer
    case !message.isSupport && state === 'closed':
      ctx.session.state = 'open';
      ctx.session.firstUnrepliedMessageId = message.messageId;
      ctx.session.firstUnrepliedMessageTime = message.date;
      break;
    // Support reply
    case message.isSupport && state === 'open':
      if (!firstUnrepliedMessageTime) break;

      responseTime = secondsToMins(message.date - firstUnrepliedMessageTime);
      repliedTo = firstUnrepliedMessageId;

      SessionControl.resetSession(ctx);
      break;
    // Consecutive unreplied messages || Support initializing dialog
    case !message.isSupport && state === 'open':
    case message.isSupport && state === 'closed':
      break;
    default:
      throw new Error('Something went wrong');
  }

  await insertToMessages({
    chatTitle: message.title,
    author: message.messageAuthor,
    messageId: message.messageId,
    message: message.text,
    sendAt: epochToTimestamp(message.date),
    isPremiumBonus: message.isSupport,
    responseTime: responseTime,
    repliedToMessage: repliedTo
  });
}
