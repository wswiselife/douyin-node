import express from 'express'
import router from './app.router'
import {defaultErrorHandler} from '../app/app.middleware'

const app = express()

/**
 * json处理
 */
app.use(express.json())

/**
 * 路由处理todo
 */
app.use(router)

/**
 * 异常处理器
 */
app.use(defaultErrorHandler)

export default app