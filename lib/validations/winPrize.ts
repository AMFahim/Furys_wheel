import { wheelStatus } from '@prisma/client';
import { z } from 'zod';

export const WinPrizeSchema = z.object({
  wheelName: z.string().min(1),
  wheelReward: z.string().min(1),
});

export const updateWinPrizeSchema = z.object({
  wheelName: z.string().min(1).optional(),
  wheelReward: z.string().min(1).optional(),
  status: z.enum([wheelStatus.APPROVED, wheelStatus.PENDING]).optional(),
});
