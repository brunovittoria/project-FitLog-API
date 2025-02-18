import { Request, Response } from 'express'
import { RemoveWorkoutService } from './service'
import { removeWorkoutSchema } from './validation'

export class RemoveWorkoutController {
    constructor(private removeWorkoutService: RemoveWorkoutService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        const validatedData = removeWorkoutSchema.parse({ id })

        await this.removeWorkoutService.execute(validatedData.id)

        return response.status(204).send()
    }
}

export const removeWorkoutController = new RemoveWorkoutController(
    new RemoveWorkoutService()
)
