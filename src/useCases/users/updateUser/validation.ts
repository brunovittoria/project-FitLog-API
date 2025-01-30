import { z } from 'zod'

export const updateUserSchema = z.object({
    id: z.string().uuid({
        message: 'Invalid user ID format'
    }),
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    permissions: z.enum(['user', 'admin']).optional(),
    subscriptionId: z.string().optional(),
    weight: z.number().optional(),
    height: z.number().optional()
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>