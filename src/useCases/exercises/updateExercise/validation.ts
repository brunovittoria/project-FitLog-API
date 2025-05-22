import { z } from 'zod'

export const updateExerciseSchema = z.object({
    id: z.string().uuid({
        message: 'Invalid exercise ID format'
    }),
    name: z.string().min(1, 'Exercise name is required').optional(),
    type: z.enum(['strength', 'cardio', 'mobility']).optional(),
    category: z.string().min(1, 'Category is required').optional(),
    equipment: z.string().min(1, 'Equipment is required').optional(),
    reps: z.number().optional(),
    sets: z.number().optional(),
    weight: z.number().optional(),
    lastWeight: z.number().nullable().optional(),
    personalBest: z.number().nullable().optional(),
    duration: z.number().nullable().optional(),
    progressData: z.array(z.object({
        date: z.string(),
        weight: z.number()
    })).optional()
})

export type UpdateExerciseInput = z.infer<typeof updateExerciseSchema>
