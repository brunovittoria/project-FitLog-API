import { Schema, Types } from 'mongoose'
import { z } from 'zod'
import { fitLogdbConnect } from '../shared'
import { collectionsData } from '@/config'

// Definindo as opções válidas para o status da assinatura
const subscriptionStatus = ['active', 'canceled', 'expired'] as const

// Validação com Zod para o modelo Subscription
export const SubscriptionSchema = z.object({
  userId: z.string(),
  status: z.enum(subscriptionStatus), // O status deve ser um dos valores válidos definidos no array
  priceId: z.string(), // O ID do preço como string
  created_at: z.date().optional(), // A data de criação pode ser opcional
  updated_at: z.date().optional() // A data de atualização também opcional
})

// Define o tipo `ISubscription` com base no esquema Zod
export type ISubscription = DocumentSchemaZod<typeof SubscriptionSchema>

// Criação do esquema Mongoose baseado no tipo `ISubscription`
const SubscriptionModelSchema = new Schema<ISubscription>(
  {
    userId: { type: String, required: true, unique: true }, // Relaciona o usuário à assinatura
    status: { type: String, enum: subscriptionStatus, required: true }, // Enum para status, aceitando apenas valores definidos no array
    priceId: { type: String, required: true }, // O preço da assinatura
    created_at: { type: Date, default: Date.now }, // A data de criação com valor padrão
    updated_at: { type: Date, default: Date.now } // A data de atualização com valor padrão
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Configura timestamps automáticos
    collection: collectionsData.Subscriptions.collection // Nome da coleção no MongoDB
  }
)

// Cria o modelo do Mongoose para Subscription
export const SubscriptionModel = fitLogdbConnect.model<ISubscription>(
  collectionsData.Subscriptions.name,
  SubscriptionModelSchema
)
