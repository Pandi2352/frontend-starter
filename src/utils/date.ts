import { appConfig } from '@/config/app';
import { dayjs } from '@/lib/dayjs';

export function formatDate(date: string | number | Date): string {
  return dayjs(date).format(appConfig.dateFormat);
}

export function formatDateTime(date: string | number | Date): string {
  return dayjs(date).format(appConfig.dateTimeFormat);
}

export function fromNow(date: string | number | Date): string {
  return dayjs(date).fromNow();
}
