import { Bot, session } from 'grammy';
import config from 'config';

import handleMessage from './modules/message-control/handle-message';
import editMessage from './modules/message-control/edit-message';
import SessionControl from './modules/session-control/session-control';

import type { MainContext } from './types';

// TODO timestamps should be in Moscow time

(() => {
  const BOT_TOKEN: string = config.get('bot-token');

  if (!BOT_TOKEN) {
    throw new Error('ERROR: Invalid token');
  }

  const bot = new Bot<MainContext>(BOT_TOKEN);

  bot.use(session(SessionControl.sessionConfig()));

  bot.command('start', (ctx) => ctx.reply('Бот успешно запущен!'));
  bot.command('closeticket', (ctx) => {
    SessionControl.resetSession(ctx);
  });

  bot.on('message', async (ctx) => {
    await handleMessage(ctx);
  });

  bot.on('edited_message', async (ctx) => {
    await editMessage(ctx);
  });

  bot.start();
})();