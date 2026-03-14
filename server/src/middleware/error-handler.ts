import type { ErrorRequestHandler } from 'express'

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  console.error(error)

  response.status(500).json({
    message: 'Internal server error',
  })
}
