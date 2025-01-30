import { z } from 'zod';
import { Types } from 'mongoose';

export const createWorkoutSchema = z.object({
    userId: z.string().refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid user ID format'
    }),
    name: z.string().min(1, 'Workout name is required'),
    description: z.string().optional(),
    status: z.enum(['active', 'inactive'], {
        errorMap: () => ({ message: 'Invalid workout status' })
    }),
    exercises: z.array(z.string()).optional()
});

export type CreateWorkoutDTO = z.infer<typeof createWorkoutSchema>;
