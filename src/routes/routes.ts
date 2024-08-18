import express, { Router, Request, Response } from 'express'

const router = Router()

// ROTAS AQUI ABAIXO

router.get('/test', (req: Request, res: Response) => {

    throw new Error("TESTE DE ERRO AQUI")
    
    return res.json({ ok: true })
})

export { router }