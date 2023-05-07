export interface SessionData {
  title: string;
  state: 'open' | 'closed';
  firstUnrepliedMessageId: number | null;
  firstUnrepliedMessageTime: number | null;
}
