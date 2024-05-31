import express from 'express'
import videoLikeController from '../controllers/videoLike.controller.js'
import verifyTokenMid from "../middlewares/jwt/jwt.js";

const router = express.Router()

router.post('/videoLike',verifyTokenMid,videoLikeController.createVideoLikeController)

router.post('/videoDislike',verifyTokenMid,videoLikeController.deleteVideoLikeController)

export default router