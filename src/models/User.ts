import { Schema } from 'mongoose'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { fitLogdbConnect, setDefaultSettingsSchema } from '../shared'
import { collectionsData } from '../config'

const userPermissions = ['user', 'admin'] as const

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  permissions: z.enum(userPermissions),
  subscriptionId: z.string().optional()
})

// Define o tipo IUser com base no esquema do Zod, combinando com mongoose.
// DocumentSchemaZod é uma função utilitária que integra Zod com o mongoose.
export type IUser = z.infer<typeof UserSchema>

const SchemaModel = new Schema<IUser>(
  {
    id: { type: String, default: uuidv4, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permissions: { type: String, enum: userPermissions, default: 'user' },
    subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription', unique: true }
  },
  {
    timestamps: true,
    collection: collectionsData.Users.collection
  }
)

setDefaultSettingsSchema(SchemaModel)

export const UserModel = fitLogdbConnect.model<IUser>(collectionsData.Users.name, SchemaModel)
