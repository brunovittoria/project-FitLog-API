import { Request, Response } from 'express'
import { UpdateExerciseService } from './service'
import { updateExerciseSchema } from './validation'

export class UpdateExerciseController {
    constructor(private updateExerciseService: UpdateExerciseService) {}
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const updateData = request.body

        // Validate input
        const validatedData = updateExerciseSchema.parse({ id, ...updateData })

        // Execute service
        const updatedExercise = await this.updateExerciseService.execute(validatedData)

        return response.status(200).json({ message: 'Exercise updated successfully' })
    }
}
// Instância do controller para uso nas rotas
export const updateExerciseController = new UpdateExerciseController(
    new UpdateExerciseService()
);
