import { Request, Response } from 'express'
import { CreateUserService } from './service'

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const user = await this.createUserService.execute({
      name,
      email,
      password
    })

    return response.json(user)
  }
}

export const createUserController = new CreateUserController(
  new CreateUserService()
)
