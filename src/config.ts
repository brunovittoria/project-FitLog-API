const environment = {
  MONGODB_DATABASE: 'FitLog',
  JWT_EXPIRATION_TIME: '10'
}

export const HOST_API = process.env.HOST_API || ''
export const MONGO_URL = process.env.MONGO_URI || ''
export const JWT_SECRET = process.env.JWT_SECRET || ''

const MILISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24

const DAYS = Number(environment.JWT_EXPIRATION_TIME) || 1

const milisecondsPerDay = MILISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY

const jwtExpirationTime = DAYS * milisecondsPerDay

export const env = {
  jwtExpirationTime
}

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
