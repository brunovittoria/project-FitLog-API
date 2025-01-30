import { Request, Response } from 'express';
import { GetAllWorkoutsService } from './service';

export class GetAllWorkoutsController {
    constructor(private getAllWorkoutsService: GetAllWorkoutsService) {}

    async handle(request: Request, response: Response) {
        const userId = request.user_id; // Supondo que o ID do usuário esteja disponível no request

        if (!userId) {
            return response.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const workouts = await this.getAllWorkoutsService.execute(userId);

        return response.status(200).json({
            success: true,
            data: workouts
        });
    }
}

export const getAllWorkoutsController = new GetAllWorkoutsController(new GetAllWorkoutsService());
