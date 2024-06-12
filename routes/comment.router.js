import express from 'express'
import verifyTokenMid from '../middlewares/jwt/jwt.js'
import commentController from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/getComment', commentController.getCommentController)

router.post('/createComment',verifyTokenMid,commentController.createCommentController)

router.post('/deleteComment',verifyTokenMid,commentController.deleteCommentController)

export default router