import type { AxiosRequestConfig } from 'axios';

import { apiClient } from './axios';

/**
 * Thin typed helpers over the single Axios instance.
 * Service files should use these instead of calling axios verbs directly.
 */
export const api = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await apiClient.get<T>(url, config);
    return data;
  },

  async post<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await apiClient.post<T>(url, body, config);
    return data;
  },

  async put<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await apiClient.put<T>(url, body, config);
    return data;
  },

  async patch<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await apiClient.patch<T>(url, body, config);
    return data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await apiClient.delete<T>(url, config);
    return data;
  },
};
