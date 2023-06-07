import { WORKING_HOURS, WORKING_HOURS_EXTENDED } from '@/constants/common';
import { EXTENDED_SUPPORT_CUSTOMERS } from '@/constants/extended-support';
import epochToTimestamp from './epoch-to-timestamp';

export default function (chatId: number, epochValue: number) {
  const hours = epochToTimestamp(epochValue).getUTCHours();

  if (EXTENDED_SUPPORT_CUSTOMERS.includes(chatId)) {
    if (hours < WORKING_HOURS_EXTENDED.close) return true;
    return false;
  }

  if (hours < WORKING_HOURS.close) return true;
  return false;
}
