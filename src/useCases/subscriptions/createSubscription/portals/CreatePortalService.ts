import Stripe from 'stripe'
import { UserModel } from '@/models/User'
import { STRIPE_SECRET_KEY } from '@/utils/config'

interface CreatePortalRequest {
    user_id: string
}

class CreatePortalService {
    async execute({ user_id }: CreatePortalRequest) {
        const stripe = new Stripe(STRIPE_SECRET_KEY, {
            apiVersion: '2024-12-18.acacia',
            appInfo: {
                name: 'FitLog',
                version: '1.0'
            }
        })

        // Busca o usuário no MongoDB através do modelo do Mongoose.
        const findUser = await UserModel.findById(user_id)

        if (!findUser) {
            console.log('User not found')
            return { message: 'User not found' }
        }

        let sessionId = findUser.subscriptionId

        if (!sessionId) {
            console.log('DOES NOT HAVE AN ID')
            return { message: 'User does not have a Stripe customer ID' }
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: sessionId,
            return_url: process.env.STRIPE_SUCESS_URL
        })

        return { sessionId: portalSession.url }
    }
}

export { CreatePortalService }