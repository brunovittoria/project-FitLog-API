import { Request, Response } from 'express'
import { GetOneUserProfileService } from './service';

export class GetOneProfileController {
  constructor(private getOneProfileService: GetOneUserProfileService) {}
  
  async handle(request: Request, response: Response) {
    
    const user_id = request.user_id //Pegamos o userId do FE

    const userProfile = await this.getOneProfileService.execute({ user_id })

    return response.json(userProfile)
  }
}

export const getOneProfileController = new GetOneProfileController(
  new GetOneUserProfileService()
) 