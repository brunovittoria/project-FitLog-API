import { z } from 'zod'

export const getOneExerciseSchema = z.object({
    id: z.string().uuid({
        message: 'Invalid exercise ID format'
    })
})

export type GetOneExerciseInput = z.infer<typeof getOneExerciseSchema>
