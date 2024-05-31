import express from 'express'
import followController from '../controllers/follow.controller.js'
import verifyTokenMid from "../middlewares/jwt/jwt.js";

const router = express.Router()

router.post('/createFllower',verifyTokenMid,followController.createFollowerController)

router.post('/cancelFllower',verifyTokenMid,followController.deleteFollowerController)

export default router