import { createConnection } from 'mongoose'

import { MONGO_URL } from '../config'

export const fitLogdbConnect = createConnection(MONGO_URL, {
  maxPoolSize: 10
})

fitLogdbConnect.on('connecting', () => console.log('Connecting to the database'))
fitLogdbConnect.on('error', err => console.error('🔴 Error connecting to the database', err))
fitLogdbConnect.on('disconnected', () => console.log('🔴 Disconnected from the database'))
