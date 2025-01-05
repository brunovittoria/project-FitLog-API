import dotenv from 'dotenv'; 
dotenv.config();

export const HOST_API = process.env.HOST_API || ''
export const JWT_SECRET = process.env.JWT_SECRET || ''
export const PORT = process.env.PORT || 3333
export const MONGO_URI = process.env.MONGO_URI || ''
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''

export const collectionsData = {
  Workouts: {
    name: 'Workouts',
    collection: 'workouts'
  },
  Exercises: {
    name: 'Exercises',
    collection: 'exercises'
  },
  Subscriptions: {
    name: 'Subscription',
    collection: 'subscriptions'
  },
  Users: {
    name: 'User',
    collection: 'user'
  }
}
