import type { MainContext } from '@/types';

import updateMessages from '@/modules/db-control/update-messages';

export default async function (ctx: MainContext) {
  // TODO Fix type guard

  const messageId = ctx.update.edited_message?.message_id;
  const payload = ctx.update.edited_message?.text;

  if (payload && messageId) {
    await updateMessages(messageId, payload);
  } else if (messageId && !payload) {
    await updateMessages(messageId, 'ERROR: Message update failed');
  }
}
