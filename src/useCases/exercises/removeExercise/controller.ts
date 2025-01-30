import { Request, Response } from 'express'
import { RemoveExerciseService } from './service'
import { removeExerciseSchema } from './validation'

export class RemoveExerciseController {
    constructor(private removeExercise: RemoveExerciseService) {}
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        // Validate input
        const validatedData = removeExerciseSchema.parse({ id })

        // Execute service
        const removeExercise = await this.removeExercise.execute(validatedData.id);

        return response.status(204).send()
    }
}

export const removeExerciseController = new RemoveExerciseController(
    new RemoveExerciseService()
);