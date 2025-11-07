import axios from 'axios'
import { environment } from '../config/environment.js'

const formatTaskMessage = (task, context) => {
  const lines = []
  lines.push(`*${task.title}*`)

  if (task.description) {
    lines.push(task.description)
  }

  if (task.assignee) {
    lines.push(`*Responsável:* ${task.assignee}`)
  }

  if (task.severity) {
    lines.push(`*Severidade:* ${task.severity}`)
  }

  if (context.repository) {
    lines.push(`*Repositório:* ${context.repository}`)
  }

  if (context.pullRequest) {
    lines.push(`*Pull Request:* ${context.pullRequest}`)
  }

  return lines.join('\n')
}

export class SlackService {
  constructor (webhookUrl) {
    this.webhookUrl = webhookUrl
  }

  async sendTaskCard (task, context = {}) {
    if (!this.webhookUrl) {
      return {
        delivered: false,
        reason: 'missing_webhook'
      }
    }

    const payload = {
      text: formatTaskMessage(task, context)
    }

    try {
      await axios.post(this.webhookUrl, payload)
      return { delivered: true }
    } catch (error) {
      const errorMessage = error.response?.data ?? error.message
      return {
        delivered: false,
        reason: 'request_failed',
        detail: typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)
      }
    }
  }
}

export const slackService = new SlackService(environment.slackWebhookUrl)
