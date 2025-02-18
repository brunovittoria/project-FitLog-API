import { Request, Response } from 'express'
import { GetOneWorkoutService } from './service'
import { getOneWorkoutSchema } from './validation'

export class GetOneWorkoutController {
    constructor(private getOneWorkoutService: GetOneWorkoutService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        const validatedData = getOneWorkoutSchema.parse({ id })

        const workout = await this.getOneWorkoutService.execute(validatedData.id)

        return response.json(workout)
    }
}

export const getOneWorkoutController = new GetOneWorkoutController(
    new GetOneWorkoutService()
)
