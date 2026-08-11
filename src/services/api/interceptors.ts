import type { AxiosError } from 'axios';

import { env } from '@/config/env';

import { apiClient } from './axios';

/**
 * Central place for request/response interceptors.
 * Add auth token handling here if the project ever needs authentication.
 */
export function setupInterceptors(): void {
  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (env.isDev) {
        console.error('API error:', error.response?.status, error.config?.url);
      }
      return Promise.reject(error);
    },
  );
}
