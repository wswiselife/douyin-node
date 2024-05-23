import express from "express";
import * as fileController from "../controllers/videoUpload.controller.js";
import { fileInterceptor,fileProcessor } from "../middlewares/file.middleware.js";
import verifyTokenMid from '../middlewares/jwt/jwt.js'

const router = express.Router();

router.post("/upload", verifyTokenMid,fileInterceptor,fileProcessor, fileController.store);

router.post('/getOneVideo/:id',fileController.getOneVideo)

export default router;
