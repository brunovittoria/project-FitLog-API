import { UserModel } from '@/models/User'
import { SubscriptionModel } from '@/models/Subscription'
import { ExerciseModel } from '@/models/Exercise'
import { WorkoutModel } from '@/models/Workout'

export class RemoveUserService {
    async execute(id: string): Promise<void> {
        const user = await UserModel.findOne({ id })

        if (!user) {
            throw new Error('User not found')
        }

        await UserModel.deleteOne({ id })
        await WorkoutModel.deleteMany({ userId: id })
        await ExerciseModel.deleteMany({ userId: id })
        await SubscriptionModel.deleteMany({ userId: id })
    }
}