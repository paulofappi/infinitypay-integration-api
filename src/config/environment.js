import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'development'
const envFile = env === 'test' ? '.env.test' : '.env'

dotenv.config({ path: envFile })

export const environment = {
  env,
  port: parseInt(process.env.PORT ?? '3000', 10),
  logLevel: process.env.LOG_LEVEL ?? 'info',
  serviceName: process.env.SERVICE_NAME ?? 'InfinityPay Integration API',
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL ?? ''
}
