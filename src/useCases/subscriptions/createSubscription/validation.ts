import * as z from 'zod'

export const validateCreateSubUserBody = z.object({
  user_id: z.string()
})
