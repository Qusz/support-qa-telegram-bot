import type { MainContext, SessionData } from '@/types';
import { FileAdapter } from '@grammyjs/storage-file';

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

  static openState(ctx: MainContext) {
    ctx.session.state = 'open';
  }

  static closeState(ctx: MainContext) {
    ctx.session.state = 'closed';
  }

  static resetMessage(ctx: MainContext) {
    ctx.session.firstUnrepliedMessageId = null;
    ctx.session.firstUnrepliedMessageTime = null;
  }

  static resetSession(ctx: MainContext) {
    this.closeState(ctx);
    this.resetMessage(ctx);
  }
}
