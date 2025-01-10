import { Request, Response } from 'express'
import { GetOneUserProfileService } from './service';

class GetOneProfileController {
  async handle(request: Request, response: Response) {
    
    const user_id = request.user_id //Pegamos o userId do FE

    const getOneUserProfileService = new GetOneUserProfileService()

    const userProfile = await getOneUserProfileService.execute({ user_id })

    return response.json(userProfile)
  }
}

export { GetOneProfileController } 