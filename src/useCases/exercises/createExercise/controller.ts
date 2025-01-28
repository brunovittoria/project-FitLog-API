import { Request, Response } from 'express';
import { CreateExerciseService } from './service';
import { createExerciseSchema } from './validation';

export class CreateExerciseController {
    constructor(private createExerciseService: CreateExerciseService) {}
    
    async handle(request: Request, response: Response) {
        const validationResult = createExerciseSchema.safeParse(request.body);

        if (!validationResult.success) {
            throw new Error(validationResult.error.errors[0].message);
        }

        const exercise = await this.createExerciseService.execute(validationResult.data);

        return response.status(201).json({
            success: true,
            data: exercise
        });
    }
}

// Instância do controller para uso nas rotas
export const createExerciseController = new CreateExerciseController(
    new CreateExerciseService()
);
