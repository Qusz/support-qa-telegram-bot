import type { MainContext, SessionData } from '@/types';
import { FileAdapter } from '@grammyjs/storage-file';
import TypePredicates from '@/modules/type-control/type-predicates';

export default class SessionControl {
  static sessionConfig() {
    return {
      initial: (): SessionData => ({
        title: '',
        state: 'closed',
        firstUnrepliedMessageId: null,
        firstUnrepliedMessageTime: null
      }),
      storage: new FileAdapter({
        dirName: 'sessions'
      })
    };
  }

  static setTitle(ctx: MainContext) {
    if (!ctx.message) {
      console.error('ERROR: Invalid message instance ');
      return;
    }

    if (!TypePredicates.notPrivateChat(ctx.message.chat)) {
      console.error('ERROR: Cannot access private chat properties');
      return;
    }

    ctx.session.title = ctx.message.chat.title;
  }

  static openState(ctx: MainContext) {
    ctx.session.state = 'open';
  }

  static closeState(ctx: MainContext) {
    ctx.session.state = 'closed';
  }

  static setUrepliedMessage(
    ctx: MainContext,
    messageId: number,
    messageTime: number
  ) {
    ctx.session.firstUnrepliedMessageId = messageId;
    ctx.session.firstUnrepliedMessageTime = messageTime;
  }

  static resetMessage(ctx: MainContext) {
    ctx.session.firstUnrepliedMessageId = null;
    ctx.session.firstUnrepliedMessageTime = null;
  }

  static openSession(ctx: MainContext, messageId: number, messageTime: number) {
    this.openState(ctx);
    this.setUrepliedMessage(ctx, messageId, messageTime);
  }

  static resetSession(ctx: MainContext) {
    this.closeState(ctx);
    this.resetMessage(ctx);
  }
}
