import { UserModel } from '../../../models/User'
import { SubscriptionModel } from '../../../models/Subscription'

interface CheckSubRequest {
    user_id: string
}

class CheckSubsService {
    async execute({ user_id }: CheckSubRequest) {
        // Busca o usuário no MongoDB através do modelo do Mongoose.
        const user = await UserModel.findById(user_id)

        if (!user) {
            throw new Error('User not found')
        }

        // Busca a assinatura do usuário
        const subscription = await SubscriptionModel.findOne({ userId: user.id })

        if (!subscription) {
            return null
        }

        return {
            id: subscription.id,
            status: subscription.status
        }
    }
}

export { CheckSubsService }