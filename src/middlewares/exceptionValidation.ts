import type { ErrorRequestHandler } from 'express'

import { ZodError } from 'zod'
import { AxiosError } from 'axios'

const error = async (err: any) => {
  if (typeof err.message === 'string') {
    return [await err.message]
  }

  if (err.message instanceof Array) {
    const translatedErrors = await Promise.all(err.message.map((error: string) => error))

    return translatedErrors
  }

  if (err.message instanceof Object) {
    const translatedErrors = await Promise.all(Object.values(err.message).map((error: any) => error))

    return translatedErrors
  }

  return err
}

export const exceptionValidation: ErrorRequestHandler = async (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: err.errors.map(error => `${error.path} ${error.message}`)
    })
  }

  if (err instanceof AxiosError) {
    return res.status(err.response?.status || 500).json({
      errors: await error(err.response?.data)
    })
  }

  return res.status(500).json({
    errors: await error(err)
  })
}
