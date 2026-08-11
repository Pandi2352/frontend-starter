import { env } from './env';

export const appConfig = {
  name: env.appName,
  defaultTheme: 'system',
  dateFormat: 'DD MMM YYYY',
  dateTimeFormat: 'DD MMM YYYY, hh:mm A',
} as const;
