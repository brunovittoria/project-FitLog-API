import { z } from 'zod'

export const removeWorkoutSchema = z.object({
    id: z.string().uuid({
        message: 'Invalid workout ID format'
    })
})

export type RemoveWorkoutInput = z.infer<typeof removeWorkoutSchema>
