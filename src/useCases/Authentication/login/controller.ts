import { Request, Response } from 'express'
import { AuthUserService } from './service'

export class AuthUserController {
  constructor(private authUserService: AuthUserService) {}

  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const session = await this.authUserService.execute({
      email,
      password
    })

    return response.json(session)
  }
}

// Exporta a instância já criada
export const authUserController = new AuthUserController(
  new AuthUserService()
)
