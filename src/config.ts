export const HOST_API = process.env.HOST_API || ''
export const MONGO_URL = process.env.MONGO_URI || ''
export const JWT_SECRET = process.env.JWT_SECRET || ''
export const PORT = process.env.PORT || 3333

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
