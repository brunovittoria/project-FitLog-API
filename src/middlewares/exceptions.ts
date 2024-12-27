import { ErrorRequestHandler } from 'express';
import * as z from 'zod';

export const exception: ErrorRequestHandler = async (err, _req, res, _next) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({ errors: err.errors });
    return;
  }

  const message = err.message;

  const status = err.status || 500;

  if (res.headersSent) return;

  res.status(status).json({ errors: [message] });
};
