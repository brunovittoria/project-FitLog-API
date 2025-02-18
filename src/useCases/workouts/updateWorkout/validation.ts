import { z } from 'zod'
import { Types } from 'mongoose'

export const updateWorkoutSchema = z.object({
    id: z.string().uuid({
        message: 'Invalid workout ID format'
    }),
    userId: z.string().refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid user ID format'
    }).optional(),
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    description: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
    exercises: z.array(z.string()).optional()
})

export type UpdateWorkoutInput = z.infer<typeof updateWorkoutSchema>
