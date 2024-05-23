import express from 'express'
import * as testController from './test.controller'
import {validateMiddleware} from '../app/app.middleware'

const router = express.Router()

router.get('/test',validateMiddleware,testController.testController)

export default router

