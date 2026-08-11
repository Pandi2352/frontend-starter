/**
 * Typed environment access — the only place `import.meta.env` is read.
 */

function required(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  apiUrl: required('VITE_API_URL'),
  appName: import.meta.env.VITE_APP_NAME ?? 'Frontend Starter',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
