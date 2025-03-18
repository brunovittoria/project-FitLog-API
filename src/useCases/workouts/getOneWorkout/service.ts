import { WorkoutModel, IWorkout } from '@/models/Workout'
import { ExerciseModel } from '@/models/Exercise'

export class GetOneWorkoutService {
    async execute(id: string): Promise<IWorkout> {
        // Primeiro encontramos o workout sem populate
        const workout = await WorkoutModel.findOne({ id })

        if (!workout) {
            throw new Error('Workout not found')
        }

        // Se precisar dos detalhes dos exercícios, podemos fazer o populate
        const workoutWithExercises = await WorkoutModel.findOne({ id })
            .populate({
                path: 'exercises',
                model: ExerciseModel,
                select: 'id name description sets reps weight' // selecione os campos que você quer
            })

        if (!workoutWithExercises) {
            throw new Error('Error loading workout details')
        }

        return workoutWithExercises
    }
}
