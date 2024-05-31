import express from "express";
import path from 'path'
import uploadVideo from "../controllers/videoUpload.controller.js";
import { fileInterceptor,fileProcessor } from "../middlewares/file.middleware.js";
import verifyTokenMid from '../middlewares/jwt/jwt.js'

const router = express.Router();

router.post("/upload", verifyTokenMid,fileInterceptor,fileProcessor, uploadVideo.createVideoUploadController);

router.post('/getOneVideo/:id',uploadVideo.getOneVideo)

// 上传视频接口和上传视频描述信息接口处理成一个接口，不是预先的分开两个接口
router.post('/uploadDescription',verifyTokenMid,fileInterceptor,fileProcessor,uploadVideo.createVideoDescriptionController)

export default router;
