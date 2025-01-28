import { z } from 'zod';
import { Types } from 'mongoose';

export const createExerciseSchema = z.object({
    workoutId: z.string().refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid workout ID format'
    }),
    name: z.string().min(1, 'Exercise name is required'),
    type: z.enum(['strength', 'cardio', 'mobility'], {
        errorMap: () => ({ message: 'Invalid exercise type' })
    }),
    reps: z.number().optional(),
    sets: z.number().optional(),
    weight: z.number().optional(),
    duration: z.number().optional()
});

export type CreateExerciseDTO = z.infer<typeof createExerciseSchema>;
