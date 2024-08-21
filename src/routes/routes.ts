import express, { Router, Request, Response } from 'express'

import { CreateUserController } from '../controllers/user/CreateUserController'
import { AuthUserController }   from '../controllers/user/AuthUserController'

const router = Router()

/*Rota teste Inicial
    router.get('/test', (req: Request, res: Response) => {
        throw new Error("TESTE DE ERRO AQUI")     
        return res.json({ ok: true })
    })
*/

// --- ROTAS USER --- \\
router.post('/users', new CreateUserController().handle)                            //CADASTRO DE USERS. a lógica para criar usuários está encapsulada no método handle do CreateUserController. Provavelmente, esse método irá extrair os dados da requisição (por exemplo, nome, e-mail, senha), criar um novo usuário e responder de volta ao cliente com os resultados da operação.
router.post('/session', new AuthUserController().handle)                            //Com essa rota ira fazer o login



export { router }