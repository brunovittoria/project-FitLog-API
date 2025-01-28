import { z } from 'zod'
import { Types } from 'mongoose'

export const updateExerciseSchema = z.object({
    id: z.string().uuid({
        message: 'Invalid exercise ID format'
    }),
    workoutId: z.string().refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid workout ID format'
    }),
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    type: z.enum(['strength', 'cardio', 'mobility']).optional(),
    reps: z.number().optional(),
    sets: z.number().optional(),
    weight: z.number().optional(),
    duration: z.number().optional()
})

export type UpdateExerciseInput = z.infer<typeof updateExerciseSchema>
