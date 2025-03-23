import { z } from 'zod'

export const updateExerciseSchema = z.object({
    id: z.string().uuid({
        message: 'Invalid exercise ID format'
    }),
    name: z.string().min(1, 'Exercise name is required').optional(),
    type: z.enum(['strength', 'cardio', 'mobility']).optional(),
    reps: z.number().optional(),
    sets: z.number().optional(),
    weight: z.number().optional(),
    duration: z.number().optional()
})

export type UpdateExerciseInput = z.infer<typeof updateExerciseSchema>
