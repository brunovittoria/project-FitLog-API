import { stripe } from './stripe'
import { UserModel } from '../models/User'
import { SubscriptionModel } from '../models/Subscription'

export async function manageSubscription(subscriptionId: string, customerId: string, createAction = false, deleteAction = false) {
  // Busca por usuários que tenham o stripeCustomerId que é enviado do controller e verifica no DB e inclui a subscription dele (se tiver)
  const findUser = await UserModel.findOne({ subscriptionId: customerId }).populate('subscriptions')

  if (!findUser) {
    throw new Error('User not found')
  }

  // Nessa variável temos acesso a detalhes da sub do cliente como: produto, tipo de sub, entre outros...
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  // Criamos um objeto com os dados recebidos do stripe e setamos dentro de props com nomes iguais aos do DB
  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id
  }

  // AGORA VAMOS CRIAR AS ACTIONS
  if (createAction) {
    console.log(subscriptionData)

    try {
      await SubscriptionModel.create(subscriptionData) // Estamos criando dentro da nossa tabela subscription e enviando os dados do nosso obj acima
    } catch (err) {
      console.log('CREATE ERROR')
      console.error(err)
    }
  } else {
    // Se não está criando vamos apenas atualizar então os dados da assinatura

    // Se ele fizer uma ação para deletar cai aqui
    if (deleteAction) {
      await SubscriptionModel.deleteOne({ id: subscriptionId })
    } else {
      // Atualiza a assinatura se não for uma ação de criação ou deleção
      await SubscriptionModel.updateOne({ id: subscriptionId }, subscriptionData)
    }
  }
}