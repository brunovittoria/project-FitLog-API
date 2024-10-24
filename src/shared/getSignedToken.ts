import { sign } from 'jsonwebtoken'

export const getSignedToken = (userId: number) => {
  return sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
