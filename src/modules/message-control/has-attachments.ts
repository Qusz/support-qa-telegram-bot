import { MainContext } from '@/types';

export default function (ctx: MainContext) {
  if (!ctx.message) {
    console.error('ERROR: Invalid message instance');
    return undefined;
  }
  return ctx.message.document;
}
