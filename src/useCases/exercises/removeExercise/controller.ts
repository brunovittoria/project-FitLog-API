import { Request, Response } from 'express'
import { RemoveExerciseService } from './service'
import { removeExerciseSchema } from './validation'

export class RemoveExerciseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        // Validate input
        const validatedData = removeExerciseSchema.parse({ id })

        // Execute service
        const removeExerciseService = new RemoveExerciseService()
        await removeExerciseService.execute(validatedData.id)

        return response.status(204).send()
    }
}
