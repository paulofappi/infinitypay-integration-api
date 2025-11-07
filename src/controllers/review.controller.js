import { slackService } from '../services/slack.service.js'

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0

const validateTask = (task, index) => {
  if (typeof task !== 'object' || task === null) {
    return `Task at index ${index} must be an object`
  }

  if (!isNonEmptyString(task.title)) {
    return `Task at index ${index} must include a non-empty title`
  }

  if (task.severity && !isNonEmptyString(task.severity)) {
    return `Task at index ${index} has an invalid severity value`
  }

  if (task.assignee && !isNonEmptyString(task.assignee)) {
    return `Task at index ${index} has an invalid assignee value`
  }

  if (task.description && !isNonEmptyString(task.description)) {
    return `Task at index ${index} has an invalid description value`
  }

  return null
}

export const createCodeReview = async (req, res, next) => {
  try {
    const { repository, pullRequest, summary, tasks } = req.body ?? {}

    if (!isNonEmptyString(repository)) {
      return res.status(400).json({
        status: 'invalid_request',
        message: 'Field "repository" must be a non-empty string'
      })
    }

    const hasPullRequest = pullRequest !== undefined && pullRequest !== null

    if (hasPullRequest && !isNonEmptyString(String(pullRequest))) {
      return res.status(400).json({
        status: 'invalid_request',
        message: 'Field "pullRequest" must be a non-empty string or number'
      })
    }

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({
        status: 'invalid_request',
        message: 'Field "tasks" must be a non-empty array'
      })
    }

    for (const [index, task] of tasks.entries()) {
      const errorMessage = validateTask(task, index)
      if (errorMessage) {
        return res.status(400).json({ status: 'invalid_request', message: errorMessage })
      }
    }

    if (summary && !isNonEmptyString(summary)) {
      return res.status(400).json({
        status: 'invalid_request',
        message: 'Field "summary" must be a non-empty string when provided'
      })
    }

    const context = {
      repository,
      pullRequest: hasPullRequest ? String(pullRequest) : undefined
    }

    const deliveryResults = []

    for (const task of tasks) {
      const result = await slackService.sendTaskCard(task, context)
      deliveryResults.push({
        title: task.title,
        delivered: result.delivered,
        detail: result.detail,
        reason: result.reason
      })
    }

    res.status(201).json({
      status: 'created',
      repository,
      pullRequest: context.pullRequest,
      summary,
      tasks: deliveryResults
    })
  } catch (error) {
    next(error)
  }
}
