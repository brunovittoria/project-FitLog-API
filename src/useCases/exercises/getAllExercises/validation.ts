import { z } from 'zod';

export const getAllExercisesSchema = z.object({
    userId: z.string().uuid({
        message: 'Invalid user ID format'
    })
});

export type GetAllExercisesDTO = z.infer<typeof getAllExercisesSchema>;
