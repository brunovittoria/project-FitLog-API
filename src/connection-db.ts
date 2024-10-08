import { createConnection } from 'mongoose'

import { MONGO_URL } from './config'

export const dbConnection = createConnection(MONGO_URL, {
  maxPoolSize: 10
})

dbConnection.on('connecting', () => console.log('Connecting to the database'))
dbConnection.on('error', err => console.error('🔴 Error connecting to the database', err))
dbConnection.on('disconnected', () => console.log('🔴 Disconnected from the database'))
