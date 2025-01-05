import * as z from 'zod'

export const validateStatusSubUserBody = z.object({
  user_id: z.string()
})
