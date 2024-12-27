import { createConnection } from 'mongoose'

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

export const fitLogdbConnect = createConnection(process.env.MONGO_URI, {
  maxPoolSize: 10
})

fitLogdbConnect.on('connecting', () => console.log('Connecting to the database'))
fitLogdbConnect.on('error', err => console.error('🔴 Error connecting to the database', err))
fitLogdbConnect.on('disconnected', () => console.log('🔴 Disconnected from the database'))
