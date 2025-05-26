import { Request, Response } from 'express';
import { GetAllExercisesService } from './service';
import { getAllExercisesSchema } from './validation';

export class GetAllExercisesController {
    constructor(private getAllExercisesService: GetAllExercisesService) { }
    /**
     * Handles the request to get all exercises for a user.
     * @param {Request} request - The request object containing user information.
     * @param {Response} response - The response object to send the result.
     * @throws {Error} If the user is not authenticated or if validation fails.
     * @returns {Response} The response with the list of exercises.
     */
    async handle(request: Request, response: Response) {
        if (!request.user) {
            throw new Error('User not authenticated');
        }

        const validationResult = getAllExercisesSchema.safeParse({
            userId: request.user.id
        });

        if (!validationResult.success) {
            throw new Error(validationResult.error.errors[0].message);
        }

        const exercises = await this.getAllExercisesService.execute(validationResult.data);

        return response.status(200).json({
            success: true,
            data: exercises
        });
    }
}

// Instância do controller para uso nas rotas
export const getAllExercisesController = new GetAllExercisesController(
    new GetAllExercisesService()
);
