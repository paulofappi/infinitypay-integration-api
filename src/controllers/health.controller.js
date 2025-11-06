import { environment } from '../config/environment.js'

export const healthController = (_req, res) => {
  const now = new Date()
  const uptimeSeconds = process.uptime()
  res.json({
    status: 'ok',
    service: environment.serviceName,
    environment: environment.env,
    timestamp: now.toISOString(),
    uptimeSeconds: Number(uptimeSeconds.toFixed(3))
  })
}
