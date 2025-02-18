import { Request, Response } from 'express'
import { UpdateWorkoutService } from './service'
import { updateWorkoutSchema } from './validation'

export class UpdateWorkoutController {
    constructor(private updateWorkoutService: UpdateWorkoutService) {}
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const updateData = request.body

        const validatedData = updateWorkoutSchema.parse({ id, ...updateData })

        const updatedWorkout = await this.updateWorkoutService.execute(validatedData)

        return response.status(200).json(updatedWorkout)
    }
}

export const updateWorkoutController = new UpdateWorkoutController(
    new UpdateWorkoutService()
)
