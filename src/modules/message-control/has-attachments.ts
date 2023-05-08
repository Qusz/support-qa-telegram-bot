import { MainContext } from '@/types';

export default function (ctx: MainContext) {
  const message = ctx.message ?? ctx.editedMessage;

  if (!message) {
    throw new Error('Cannot access message instance');
  }

  return !!(
    message.audio ||
    message.animation ||
    message.document ||
    message.photo ||
    message.sticker ||
    message.video ||
    message.video_note ||
    message.voice ||
    message.contact ||
    message.location ||
    message.poll ||
    message.dice ||
    message.game ||
    message.invoice ||
    message.successful_payment ||
    message.passport_data ||
    message.proximity_alert_triggered
  );
}
