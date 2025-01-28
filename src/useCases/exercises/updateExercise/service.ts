import { ExerciseModel } from '@/models/Exercise'
import { UpdateExerciseInput } from './validation'

export class UpdateExerciseService {
    async execute(data: UpdateExerciseInput): Promise<void> {
        const { id, ...updateData } = data
        
        const exercise = await ExerciseModel.findOne({ id })
        if (!exercise) {
            throw new Error('Exercise not found')
        }
        
        await ExerciseModel.updateOne({ id }, { $set: updateData })
    }
}