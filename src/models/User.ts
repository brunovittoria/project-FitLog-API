import { Schema } from 'mongoose'
import { z } from 'zod'
import { fitLogdbConnect, setDefaultSettingsSchema } from '../shared'
import { collectionsData } from '@/config'

const userPermissions = ['user', 'admin'] as const

// Cria o esquema de validação Zod para os dados do usuário.
// Aqui o Zod vai validar que o "name" seja uma string e que "permissions" seja um dos valores do array "userPermissions".
export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  permissions: z.enum(userPermissions),
  subscriptionId: z.string().optional() // Agora referenciamos diretamente o ID da assinatura.
})

// Define o tipo IUser com base no esquema do Zod, combinando com mongoose.
// DocumentSchemaZod é uma função utilitária que integra Zod com o mongoose.
export type IUser = DocumentSchemaZod<typeof UserSchema>

// Cria o esquema mongoose para o modelo de usuário no banco de dados.
const SchemaModel = new Schema<IUser>(
  {
    name: { type: String, required: true }, // O campo "name" é obrigatório e deve ser uma string.
    email: { type: String, required: true, unique: true }, // Adiciona o campo email no Mongoose
    password: { type: String, required: true },
    permissions: { type: String, enum: userPermissions, default: 'user' }, // O campo "permissions" deve ser uma string, aceita só 'user' ou 'admin', e por padrão será 'user'.
    subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription', unique: true } // Relacionamento 1-para-1 com o model Subscription
  },
  {
    timestamps: true, // Adiciona campos automáticos "createdAt" e "updatedAt".
    collection: collectionsData.Users.collection // Define o nome da coleção (tabela) onde os dados serão armazenados.
  }
)

// Aplica configurações padrão ao SchemaModel usando uma função personalizada.
setDefaultSettingsSchema(SchemaModel)

// Cria o modelo do mongoose baseado no esquema definido, conectado ao banco de dados.
// O modelo será usado para interagir com a coleção "Users" do banco.
export const UserModel = fitLogdbConnect.model<IUser>(collectionsData.Users.name, SchemaModel)
