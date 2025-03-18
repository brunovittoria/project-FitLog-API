import { Request, Response } from 'express';
import { CreateWorkoutService } from './service';
import { createWorkoutSchema } from './validation';

export class CreateWorkoutController {
    constructor(private createWorkoutService: CreateWorkoutService) {}
    
    async handle(request: Request, response: Response) {
        // Adiciona o userId do middleware de autenticação ao body
        const workoutData = {
            ...request.body,
            userId: request.user_id
        };

        const validationResult = createWorkoutSchema.safeParse(workoutData);

        if (!validationResult.success) {
            throw new Error(validationResult.error.errors[0].message);
        }

        const workout = await this.createWorkoutService.execute(validationResult.data);

        return response.status(201).json({
            success: true,
            data: workout
        });
    }
}

export const createWorkoutController = new CreateWorkoutController(
    new CreateWorkoutService()
);