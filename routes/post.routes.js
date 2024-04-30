import express from 'express'
import postController from '../controllers/post/post.controller.js'
import verifyTokenMid from '../middlewares/jwt/jwt.js'

const router = express.Router()

router.post('/getPostList',verifyTokenMid,postController.getPostList)
router.post('/createPost',verifyTokenMid,postController.createPost)
router.get('/getPostItem',postController.getPostItem)

export default router