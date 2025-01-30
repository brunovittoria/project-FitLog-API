import { Request, Response } from 'express'
import { GetOneExerciseService } from './service'
import { getOneExerciseSchema } from './validation'

export class GetOneExerciseController {
    constructor(private getOneExerciseService: GetOneExerciseService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        // Validate input
        const validatedData = getOneExerciseSchema.parse({ id })

        // Execute service
        const getOneExercise = await this.getOneExerciseService.execute(validatedData.id);

        return response.json(getOneExercise)
    }
}
export const getOneExerciseController = new GetOneExerciseController(
    new GetOneExerciseService()
);
