import type { Context, SessionFlavor } from 'grammy';
import type { SessionData } from './session-data';

export type MainContext = Context & SessionFlavor<SessionData>;
