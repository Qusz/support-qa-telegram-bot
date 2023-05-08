import { messagesTable } from './db-model';

export default async function (
  messageId: number | undefined,
  newText: string | undefined
) {
  const message = await messagesTable.findOne({
    where: { message_id: messageId }
  });

  if (!message) {
    throw new Error(`Message ${messageId} not found.`);
  }

  try {
    await message.update({ message_text: newText });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating message: ${error.message}`);
    }
  }
}
