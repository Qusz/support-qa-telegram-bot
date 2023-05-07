import type { StorageData } from '@/types';

import { sequelize, messagesTable } from './db-model';

export default async function (data: StorageData) {
  await sequelize.sync(); // create the table if it doesn't exist

  try {
    await messagesTable.create({
      author: data.author,
      message_text: data.message,
      chat_title: data.chatTitle,
      sent_at: data.sendAt,
      is_premium_bonus: data.isPremiumBonus,
      response_time: data.responseTime,
      message_id: data.messageId,
      replied_to_message: data.repliedToMessage
    });
  } catch (error) {
    console.error('Error inserting row:', error);
  }
}
