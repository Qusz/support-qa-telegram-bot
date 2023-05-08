import type { MainContext } from '@/types';

import updateMessages from '@/modules/db-control/update-messages';
import hasAttachments from './has-attachments';

export default async function (ctx: MainContext) {
  const messageId = ctx.update.edited_message?.message_id;
  const payload = ctx.update.edited_message?.text;

  switch (true) {
    case payload && messageId && !hasAttachments(ctx):
      await updateMessages(messageId, payload);
      break;
    case payload && messageId && hasAttachments(ctx):
      await updateMessages(messageId, 'Вложение');
      break;
    case !payload && messageId && hasAttachments(ctx):
      await updateMessages(messageId, 'Вложение');
      break;
    default:
      throw new Error('UNEXCEPTED ERROR: Cannot update message');
  }
}
