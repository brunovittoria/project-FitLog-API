import { ExerciseModel, IExercise } from '@/models/Exercise';
import { CreateExerciseDTO } from './validation';
import { WorkoutModel } from '@/models/Workout';

export class CreateExerciseService {
    async execute(data: CreateExerciseDTO): Promise<IExercise> {
        const workout = await WorkoutModel.findOne({ id: data.workoutId });

        if (!workout) {
            throw new Error('Workout not found');
        }

        const exercise = await ExerciseModel.create({
            ...data,
            workoutId: workout._id
        });
        return exercise.toObject();
    }
}
