import express from 'express'
import collectionController from '../controllers/collection.controller.js'
import verifyTokenMid from "../middlewares/jwt/jwt.js";
const router  = express.Router()

router.post('/createCollection',verifyTokenMid,collectionController.createCollectionController)

router.post('/deleteCollection',verifyTokenMid,collectionController.deleteCollectionController)

export default router