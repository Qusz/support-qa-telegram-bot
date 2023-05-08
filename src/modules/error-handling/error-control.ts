import { BotError, GrammyError, HttpError } from 'grammy';
import type { MainContext } from '@/types';

export default function (error: BotError<MainContext>) {
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
}
