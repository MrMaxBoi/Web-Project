import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'name is required'),
    email: z.string().email('email must be valid'),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().length(24, 'id must be a 24-char ObjectId'),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
  }).refine(data => Object.keys(data).length > 0, {
    message: 'Provide at least one field to update',
  }),
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().length(24, 'id must be a 24-char ObjectId'),
  }),
});