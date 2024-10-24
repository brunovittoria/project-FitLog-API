import * as z from 'zod'

export const validateLoginUserBody = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
