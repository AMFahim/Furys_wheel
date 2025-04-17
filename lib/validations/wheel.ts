import { z } from 'zod';

export const WheelOptionSchema = z.object({
  name: z.string().min(1),
  percentage: z.number().min(0).max(100),
  colour: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/), // hex color
});

export const WheelSchema = z.object({
  name: z.string().min(1),
  wheelOption: z.array(WheelOptionSchema),
});

export const updateWheelSchema = z.object({
  name: z.string().min(1).optional(),
  status: z.enum(['PENDING', 'APPROVED']).optional(),
  wheelOption: z.array(WheelOptionSchema).optional(),
});
