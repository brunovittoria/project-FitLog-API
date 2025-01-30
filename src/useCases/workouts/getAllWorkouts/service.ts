import { WorkoutModel } from '@/models/Workout';

export class GetAllWorkoutsService {
    async execute(userId: string) {
        return await WorkoutModel.find({ userId });
    }
}