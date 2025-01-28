import { Request, Response } from 'express'
import { GetOneExerciseService } from './service'
import { getOneExerciseSchema } from './validation'

export class GetOneExerciseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        // Validate input
        const validatedData = getOneExerciseSchema.parse({ id })

        // Execute service
        const getOneExerciseService = new GetOneExerciseService()
        const exercise = await getOneExerciseService.execute(validatedData.id)

        return response.json(exercise)
    }
}
