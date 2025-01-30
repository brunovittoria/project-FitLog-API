import { Request, Response } from 'express'
import { RemoveUserService } from './service'
import { removeUserSchema } from './validation'

export class RemoveUserController {
    constructor(private removeUserService: RemoveUserService) {}
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        // Validate input
        const validatedData = removeUserSchema.parse({ id })

        // Execute service
        await this.removeUserService.execute(validatedData.id);

        return response.status(204).send()
    }
}

export const removeUserController = new RemoveUserController(
    new RemoveUserService()
);