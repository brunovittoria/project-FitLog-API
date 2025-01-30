import { IUser, UserModel } from '@/models/User'
import { UpdateUserInput } from './validation'

export class UpdateUserService {
    async execute(data: UpdateUserInput): Promise<IUser | null> {
        const user = await UserModel.findOne({ id: data.id })

        if (!user) {
            throw new Error('User not found')
        }

        Object.assign(user, data)
        await user.save()

        return user
    }
}