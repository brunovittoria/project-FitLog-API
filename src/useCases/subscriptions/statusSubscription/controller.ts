import { Request, Response } from "express";
import { CheckSubsService } from './service';

export class CheckSubsController {
    constructor(private checkSubsService: CheckSubsService) {}
    
    async handle(request: Request, response: Response) {
        const user_id = request.user_id

        const status = await this.checkSubsService.execute({     //Checamos o status com base no user_id, entao passamos essa informaçao para nosso services
            user_id
        })

        return response.json(status)
    }
}

export const checkSubsController = new CheckSubsController(
    new CheckSubsService()
)