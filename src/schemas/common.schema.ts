import { z } from 'zod';

export const emailSchema = z.email('Enter a valid email address');

export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

export const idSchema = z.string().min(1, 'ID is required');

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
