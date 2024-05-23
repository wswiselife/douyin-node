import express from 'express'
import userController from '../controllers/user.controller/user.controller.js'
import verifyTokenMid from '../middlewares/jwt/jwt.js'

const router = express.Router()

router.post('/updateUserInfo',verifyTokenMid ,userController.userinfoUpdate)

router.get('/getUserInfo',verifyTokenMid,userController.getUserinfo)

export default router