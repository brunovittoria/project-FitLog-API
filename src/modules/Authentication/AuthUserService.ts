import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UserModel } from '../../models/User'

interface AuthUserRequest {
  email: string
  password: string
}

class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    // Busca o usuário no MongoDB através do modelo do Mongoose.
    const user = await UserModel.findOne({ email }).populate('subscriptions')

    if (!user) {
      throw new Error('Email/Password Incorrect')
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('Email/Password incorrect')
    }

    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the environment variables')
    }

    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      jwtSecret,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    // Retorna os dados do usuário e as informações de assinatura
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
      subscriptions: user.subscriptions
        ? {
            id: user.subscriptions.id,
            status: user.subscriptions.status
          }
        : null
    }
  }
}

export { AuthUserService }
