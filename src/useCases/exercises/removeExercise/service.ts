import { ExerciseModel } from '@/models/Exercise'

export class RemoveExerciseService {
    async execute(id: string): Promise<void> {
        const exercise = await ExerciseModel.findOne({ id })

        if (!exercise) {
            throw new Error('Exercise not found')
        }

        await ExerciseModel.deleteOne({ id })
    }
}
