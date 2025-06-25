import { ExerciseModel, IExercise } from '@/models/Exercise';
import { CreateExerciseDTO } from './validation';
import { WorkoutModel } from '@/models/Workout';

export class CreateExerciseService {
    async execute(data: CreateExerciseDTO): Promise<IExercise> {
        const workout = await WorkoutModel.findOne({ id: data.workoutId });

        if (!workout) {
            throw new Error('Workout not found');
        }

        const exerciseToCreate = {
            ...data,
            workoutId: workout._id,
            lastWeight: null,
            personalBest: data.weight || null,
            progressData: (data.weight || data.reps || data.sets)
                ? [{
                    date: new Date().toISOString(),
                    weight: data.weight || 0,
                    reps: data.reps,
                    sets: data.sets
                }]
                : [],
        };

        const exercise = await ExerciseModel.create(exerciseToCreate);
        
        return exercise.toObject();
    }
}
