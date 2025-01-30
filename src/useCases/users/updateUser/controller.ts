import { Request, Response } from 'express'
import { UpdateUserService } from './service';
import { updateUserSchema } from './validation';

export class UpdateUserController {
    constructor(private updateUserService: UpdateUserService) {}
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const userData = request.body

        // Validate input
        const validatedData = updateUserSchema.parse({ id, ...userData })

        // Execute service
        const updatedUser = await this.updateUserService.execute(validatedData);

        return response.status(200).json(updatedUser)
    }
}

export const updateUserController = new UpdateUserController(
    new UpdateUserService()
);