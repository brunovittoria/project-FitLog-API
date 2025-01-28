import { ExerciseModel, IExercise } from '@/models/Exercise';
import { CreateExerciseDTO } from './validation';
import { Types } from 'mongoose';

export class CreateExerciseService {
  async execute(data: CreateExerciseDTO): Promise<IExercise> {
    const exercise = await ExerciseModel.create({
      ...data,
      workoutId: new Types.ObjectId(data.workoutId)
    });

    return exercise.toObject();
  }
}
