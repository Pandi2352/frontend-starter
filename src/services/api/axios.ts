import axios from 'axios';

import { env } from '@/config/env';

/**
 * The single Axios instance for the whole app.
 * Never create another instance elsewhere.
 */
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 30_000,
  withCredentials: true, // send the httpOnly refresh-token cookie
  headers: {
    'Content-Type': 'application/json',
  },
});
