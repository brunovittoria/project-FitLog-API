import { WorkoutModel, IWorkout } from '@/models/Workout'
import { CreateWorkoutDTO } from './validation';
import { Types } from 'mongoose';

export class CreateWorkoutService {
    async execute(data: CreateWorkoutDTO): Promise<IWorkout> {
        const workout = await WorkoutModel.create({
            ...data,
            userId: new Types.ObjectId(data.userId),
            exercises: data.exercises?.map(id => new Types.ObjectId(id)) || []
        });
        return workout.toObject();
    }
}