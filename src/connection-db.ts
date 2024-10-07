import { createConnection } from 'mongoose'

export const dbConnection = createConnection(process.env.MONGO_URL, {
  maxPoolSize: 10
})

dbConnection.on('connecting', () => console.log('Connecting to the database'))
dbConnection.on('error', err => console.error('🔴 Error connecting to the database', err))
dbConnection.on('disconnected', () => console.log('🔴 Disconnected from the database'))
