import dotenv from 'dotenv'; 
dotenv.config();

export const HOST_API = process.env.HOST_API || ''
export const JWT_SECRET = process.env.JWT_SECRET || ''
export const PORT = process.env.PORT || 3333
export const MONGO_URI = process.env.MONGO_URI || ''

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
    name: 'Subscriptions',
    collection: 'subscriptions'
  },
  Users: {
    name: 'User',
    collection: 'user'
  }
}
