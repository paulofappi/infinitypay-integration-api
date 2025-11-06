import express from 'express'
import helmet from 'helmet'
import healthRoutes from './routes/health.routes.js'

export const buildApp = () => {
  const app = express()

  app.use(helmet())
  app.use(express.json())

  app.get('/', (_req, res) => {
    res.json({ message: 'InfinityPay Integration API' })
  })

  app.use('/api', healthRoutes)

  app.use((req, res) => {
    res.status(404).json({
      status: 'not_found',
      message: `Route ${req.method} ${req.originalUrl} was not found`
    })
  })

  app.use((err, _req, res, _next) => {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  })

  return app
}
