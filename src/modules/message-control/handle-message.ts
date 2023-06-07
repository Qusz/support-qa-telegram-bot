import type { MainContext } from '@/types';

import insertToMessages from '@/modules/db-control/insert-to-messages';
import SessionControl from '@/modules/session-control/session-control';

import epochToTimestamp from '@/utils/epoch-to-timestamp';
import secondsToMins from '@/utils/seconds-to-mins';
import workingHoursCheck from '@/utils/working-hours-check';

import getChatDetails from './get-chat-details';

export default async function (ctx: MainContext) {
  const message = getChatDetails(ctx);
  const { firstUnrepliedMessageId, firstUnrepliedMessageTime, state } =
    ctx.session;

  // Ignore messages with undefined payload
  if (!message) return;

  let responseTime: null | number = null;
  let repliedTo: null | number = null;

  SessionControl.setTitle(ctx);

  switch (true) {
    /* Ignore messages past working hours or consecutive unreplied messages or Support initializing dialog */
    case !message.isSupport &&
      !workingHoursCheck(message.chatId, message.date) &&
      state === 'closed':
    case !message.isSupport && state === 'open':
    case message.isSupport && state === 'closed':
      break;
    // Message from customer during working hours
    case !message.isSupport &&
      workingHoursCheck(message.chatId, message.date) &&
      state === 'closed':
      SessionControl.openSession(ctx, message.messageId, message.date);
      break;
    case message.isSupport && state === 'open':
      if (!firstUnrepliedMessageTime) break;

      responseTime = secondsToMins(message.date - firstUnrepliedMessageTime);
      repliedTo = firstUnrepliedMessageId;

      SessionControl.resetSession(ctx);
      break;
    default:
      throw new Error('Something went wrong');
  }

  await insertToMessages({
    chatTitle: message.title,
    chatId: message.chatId,
    author: message.messageAuthor,
    messageId: message.messageId,
    message: message.text,
    sendAt: epochToTimestamp(message.date),
    isPremiumBonus: message.isSupport,
    responseTime: responseTime,
    repliedToMessage: repliedTo
  });
}
