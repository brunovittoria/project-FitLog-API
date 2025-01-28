import { ExerciseModel, IExercise } from '@/models/Exercise'

export class GetOneExerciseService {
    async execute(id: string): Promise<IExercise> {
        const exercise = await ExerciseModel.findOne({ id })

        if (!exercise) {
            throw new Error('Exercise not found')
        }

        return exercise
    }
}
