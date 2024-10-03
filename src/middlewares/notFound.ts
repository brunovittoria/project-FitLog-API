import type { RequestHandler } from 'express'

import { HTTPError } from '../errors/httpError'

export const notFound: RequestHandler = (req, res, next) => {
  next(new HTTPError('Resource not found', 404))
}
