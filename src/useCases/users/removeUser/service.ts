import { UserModel } from '@/models/User'

export class RemoveUserService {
    async execute(id: string): Promise<void> {
        const user = await UserModel.findOne({ id })

        if (!user) {
            throw new Error('User not found')
        }

        await UserModel.deleteOne({ id })
    }
}