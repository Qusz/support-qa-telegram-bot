import { messagesTable } from './db-model';

export default async function (
  messageId: number,
  newText: string
): Promise<void> {
  const message = await messagesTable.findOne({
    where: { message_id: messageId }
  });

  if (message) {
    try {
      await message.update({ message_text: newText });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating message: ${error.message}`);
      }
    }
  } else {
    console.log(`Message ${messageId} not found.`);
  }
}
