import { ExerciseModel, IExercise } from '@/models/Exercise'
import { UpdateExerciseInput } from './validation'

export class UpdateExerciseService {
    async execute(data: UpdateExerciseInput): Promise<IExercise> {
        const exercise = await ExerciseModel.findOne({ id: data.id })

        if (!exercise) {
            throw new Error('Exercise not found')
        }

        if (data.weight !== undefined && data.weight !== null) {
            exercise.lastWeight = exercise.weight;
            exercise.weight = data.weight;
            if (!exercise.personalBest || data.weight > exercise.personalBest) {
                exercise.personalBest = data.weight;
            }
            
            if (!exercise.progressData) {
                exercise.progressData = [];
            }
            exercise.progressData.push({
                date: new Date().toISOString(),
                weight: data.weight,
            });
        }

        if (data.name) exercise.name = data.name;
        if (data.category) exercise.category = data.category;
        if (data.equipment) exercise.equipment = data.equipment;
        if (data.type) exercise.type = data.type;
        if (data.reps) exercise.reps = data.reps;
        if (data.sets) exercise.sets = data.sets;
        if (data.duration) exercise.duration = data.duration;
        
        await exercise.save()
        return exercise.toObject()
    }
}