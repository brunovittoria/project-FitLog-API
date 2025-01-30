import { z } from 'zod'

export const removeUserSchema = z.object({
    id: z.string().uuid({
        message: 'Invalid user ID format'
    })
})

export type RemoveUserInput = z.infer<typeof removeUserSchema>
