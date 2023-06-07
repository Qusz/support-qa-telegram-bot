import type { MainContext } from '@/types';

export default async function (ctx: MainContext) {
  ctx.deleteMessage().catch((error) => {
    console.log(error);
  });
}
