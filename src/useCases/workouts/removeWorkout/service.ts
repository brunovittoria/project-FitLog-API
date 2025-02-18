import { WorkoutModel } from '@/models/Workout'
import { ExerciseModel } from '@/models/Exercise'

export class RemoveWorkoutService {
    async execute(id: string): Promise<void> {
        const workout = await WorkoutModel.findOne({ id })

        if (!workout) {
            throw new Error('Workout not found')
        }

        await ExerciseModel.deleteMany({ workoutId: workout._id })

        await WorkoutModel.deleteOne({ id })
    }
}
