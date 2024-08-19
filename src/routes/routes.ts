import express, { Router, Request, Response } from 'express'

import { CreateUserController } from '../controllers/user/CreateUserController'

const router = Router()

/*Rota teste Inicial
    router.get('/test', (req: Request, res: Response) => {
        throw new Error("TESTE DE ERRO AQUI")     
        return res.json({ ok: true })
    })
*/

// --- ROTAS USER --- \\
router.post('/users', new CreateUserController().handle)



export { router }