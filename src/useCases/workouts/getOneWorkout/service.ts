import { WorkoutModel, IWorkout } from '@/models/Workout'

export class GetOneWorkoutService {
    async execute(id: string): Promise<IWorkout> {
        const workout = await WorkoutModel.findOne({ id }).populate('exercises')

        if (!workout) {
            throw new Error('Workout not found')
        }

        return workout
    }
}
