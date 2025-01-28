import { Request, Response } from 'express'
import { UpdateExerciseService } from './service'
import { updateExerciseSchema } from './validation'

export class UpdateExerciseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const updateData = request.body

        // Validate input
        const validatedData = updateExerciseSchema.parse({ id, ...updateData })

        // Execute service
        const updateExerciseService = new UpdateExerciseService()
        await updateExerciseService.execute(validatedData)

        return response.status(200).json({ message: 'Exercise updated successfully' })
    }
}