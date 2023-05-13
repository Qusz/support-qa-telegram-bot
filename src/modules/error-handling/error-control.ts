import { Bot, BotError, GrammyError, HttpError } from 'grammy';
import { ADMIN_CHAT_ID } from '@/constants/users';

import type { MainContext } from '@/types';

export default async function (
  error: BotError<MainContext>,
  bot: Bot<MainContext>
) {
  const { ctx } = error;
  const errorInstance = error.error;

  console.error(`Error while handling update ${ctx.update.update_id}:`);

  if (errorInstance instanceof GrammyError) {
    console.error('Bot Error:', errorInstance.description);
  } else if (errorInstance instanceof HttpError) {
    console.error('HTTP request failed:', errorInstance);
  } else {
    console.error('Unknown error:', errorInstance);
  }

  try {
    if (!ADMIN_CHAT_ID) return;

    await bot.api.sendMessage(ADMIN_CHAT_ID, error.message);
  } catch (notificationError) {
    if (notificationError instanceof Error) {
      console.error(`Failed to send error message: ${error.message}`);
    }
  }
}
