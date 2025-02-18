import { z } from 'zod'

export const getOneWorkoutSchema = z.object({
    id: z.string().uuid({
        message: 'Invalid workout ID format'
    })
})

export type GetOneWorkoutInput = z.infer<typeof getOneWorkoutSchema>
