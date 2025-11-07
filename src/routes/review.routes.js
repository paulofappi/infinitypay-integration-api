import { Router } from 'express'
import { createCodeReview } from '../controllers/review.controller.js'

const router = Router()

router.post('/reviews', createCodeReview)

export default router
