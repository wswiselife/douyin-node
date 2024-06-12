import express from 'express'
import userInfoController from '../controllers/userInfo.controller.js'
import verifyTokenMid from '../middlewares/jwt/jwt.js'

const router = express.Router()

router.post('/updateUserInfo',verifyTokenMid ,userInfoController.updateUserInfoController)

router.get('/getUserInfo',verifyTokenMid,userInfoController.getUserInfoController)

router.post('/getMyVideo',verifyTokenMid,userInfoController.getMyVideoController)

export default router