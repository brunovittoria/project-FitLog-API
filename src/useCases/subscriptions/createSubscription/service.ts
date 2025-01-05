import Stripe from 'stripe'
import { UserModel } from '../../../models/User'
import { validateCreateSubUserBody } from './validation'
import { STRIPE_SECRET_KEY } from '@/utils/config'

interface SubRequest {
  user_id: string
}

class SubService {
  async execute({ user_id }: SubRequest) {
    validateCreateSubUserBody.parse({ user_id })

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
      appInfo: {
        name: 'FitLog',
        version: '1.0'
      }
    })

    // 1° Buscar o usuario e cadastrar ele no stripe caso nao tenha cadastrado
    const findUser = await UserModel.findById(user_id)

    if (!findUser) {
      throw new Error('User not found')
    }

    // 2° Depois de buscar o usuario temos uma coluna dentro a tabela USERS que podemos pegar o stripe_id do usuario
    let stripeCustomerId = findUser.subscriptionId

    // 3° Caso nao tenha, criamos como cliente la no STRIPE
    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email: findUser.email
      })

      // Agora fazemos uma atualizaçao no database com as novas informaçoes que obtemos da criaçao do user no STRIPE
      findUser.subscriptionId = stripeCustomer.id
      await findUser.save()
    }

    return {
      message: 'Subscription created successfully',
      stripeCustomerId: findUser.subscriptionId
    }
  }
}

export { SubService }