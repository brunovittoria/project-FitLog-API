import { Request, Response } from "express";
import { SubService } from './service';

export class SubsCreateController {
    constructor(private subsCreateService: SubService) {}
    
    async handle(request: Request, response: Response) {   
      const user_id = request.user_id  //Primeira coisa que fazemos é pegar o ID do user, que temos pois pra ele pagar deve estar logado

      const subscribe = await this.subsCreateService.execute({
          user_id
      })

      return response.json(subscribe)
    }
}

export const subsCreateController = new SubsCreateController(
    new SubService()
)