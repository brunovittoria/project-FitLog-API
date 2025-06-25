import { z } from 'zod';

export const createExerciseSchema = z.object({
    workoutId: z.string().uuid({
        message: 'Invalid workout ID format'
    }),
    name: z.string().min(1, 'Exercise name is required'),
    type: z.enum(['strength', 'cardio', 'mobility'], {
        errorMap: () => ({ message: 'Invalid exercise type' })
    }),
    category: z.string().min(1, 'Category is required'),
    equipment: z.string().min(1, 'Equipment is required'),
    reps: z.number().optional(),
    sets: z.number().optional(),
    weight: z.number().optional(),
    lastWeight: z.number().nullable().optional(),
    personalBest: z.number().nullable().optional(),
    duration: z.number().nullable().optional(),
    progressData: z.array(z.object({
        date: z.string(),
        weight: z.number(),
        reps: z.number().optional(),
        sets: z.number().optional(),
    })).optional()
});

export type CreateExerciseDTO = z.infer<typeof createExerciseSchema>;
