import { hash } from 'bcryptjs'
import { UserModel } from '../../../models/User'
import { v4 as uuidv4 } from 'uuid'

interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error('Email Incorrect!')
    }

    const userAlreadyExists = await UserModel.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User/Email already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = new UserModel({
      id: uuidv4(),
      name,
      email,
      password: passwordHash
    })

    await user.save() // Salva o usuário no MongoDB

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}

export { CreateUserService }