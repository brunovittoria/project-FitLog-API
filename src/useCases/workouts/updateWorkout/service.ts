import { WorkoutModel } from '@/models/Workout'
import { UpdateWorkoutInput } from './validation'

export class UpdateWorkoutService {
    async execute(data: UpdateWorkoutInput): Promise<void> {
        const { id, ...updateData } = data
        
        const workout = await WorkoutModel.findOne({ id })
        
        if (!workout) {
            throw new Error('Workout not found')
        }
        
        await WorkoutModel.updateOne({ id }, { $set: updateData })
    }
}
