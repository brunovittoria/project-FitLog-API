import { Request, Response } from 'express';
import { CreateWorkoutService } from './service';
import { createWorkoutSchema } from './validation';

export class CreateWorkoutController {
    constructor(private createWorkoutService: CreateWorkoutService) {}
    
    async handle(request: Request, response: Response) {
        const validationResult = createWorkoutSchema.safeParse(request.body);

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