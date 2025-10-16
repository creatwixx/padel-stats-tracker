import { z } from 'zod';

export const validSet = z
  .string()
  .regex(/^\d{1,2}-\d{1,2}$/, 'Set must be in format X-Y (e.g. 6-4)')
  .refine((val) => {
    const [a, b] = val.split('-').map(Number);

    if ([a, b].some((n) => isNaN(n) || n < 0 || n > 7)) return false;

    if (a === b) return false;

    if (a < 6 && b < 6) return false;

    if (a === 7 && b < 5) return false;
    if (b === 7 && a < 5) return false;

    if ((a === 6 || b === 6) && Math.abs(a - b) < 2) return false;

    return true;
  }, 'Invalid set score');
