import { ExerciseModel, IExercise } from '@/models/Exercise'
import { UpdateExerciseInput } from './validation'

export class UpdateExerciseService {
    async execute(data: UpdateExerciseInput): Promise<IExercise> {
        const exercise = await ExerciseModel.findOne({ id: data.id })

        if (!exercise) {
            throw new Error('Exercise not found')
        }

        // Atualiza apenas os campos fornecidos
        Object.assign(exercise, {
            name: data.name || exercise.name,
            type: data.type || exercise.type,
            reps: data.reps || exercise.reps,
            sets: data.sets || exercise.sets,
            weight: data.weight || exercise.weight,
            duration: data.duration || exercise.duration
        })

        await exercise.save()
        return exercise
    }
}