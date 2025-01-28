import { z } from 'zod'

export const removeExerciseSchema = z.object({
        id: z.string().uuid({
        message: 'Invalid exercise ID format'
    })
})

export type RemoveExerciseInput = z.infer<typeof removeExerciseSchema>
