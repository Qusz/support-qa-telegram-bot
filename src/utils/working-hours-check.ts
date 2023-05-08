import { WORKING_HOURS } from '@/constants/common';
import epochToTimestamp from './epoch-to-timestamp';

export default function (epochValue: number) {
  const hours = epochToTimestamp(epochValue).getUTCHours();

  if (hours < WORKING_HOURS.close) {
    return true;
  }
  return false;
}
