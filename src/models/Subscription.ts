import { Schema, Types } from 'mongoose'
import { z } from 'zod'
import { fitLogdbConnect } from '../shared'
import { collectionsData } from '../utils/config'

const subscriptionStatus = ['active', 'canceled', 'expired'] as const

// Validação com Zod para o modelo Subscription
export const SubscriptionSchema = z.object({
  userId: z.string().refine(val => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId'
  }), // userId como string com validação para ObjectId
  status: z.enum(subscriptionStatus),
  priceId: z.string(),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
})

export type ISubscription = z.infer<typeof SubscriptionSchema>

const SubscriptionModelSchema = new Schema<ISubscription>(
  {
    userId: { type: String, ref: 'User', required: true, unique: true },
    status: { type: String, enum: subscriptionStatus, required: true },
    priceId: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: collectionsData.Subscriptions.collection
  }
)

export const SubscriptionModel = fitLogdbConnect.model<ISubscription>(
  collectionsData.Subscriptions.name,
  SubscriptionModelSchema
)
