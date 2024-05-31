// const express = require('express')
import express from 'express'
import routes from './routes/routes.js'
import path from 'path'
import { fileURLToPath } from 'url';

import defaultErrorHandle from './error/error.js'

const app = express()
const port = 3000

// 跨域cros
app.use('*',(req,res,next)=>{
    // 允许资源访问路径 */指定ip
    res.setHeader('Access-Control-Allow-Origin','*')    // '*'或'Origin'
    // 允许使用的请求方法   get\post\head为默认
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    // 默认只支持三种相应头，需要支持application/json要设置content-type
    res.setHeader('Access-Control-Allow-Headers','Content-Type,AC-User-Agent,token,Authorization')
    next()
})

// 预检请求，只有满足一下条件才会发送预检请求
// 1. Content-Type为application/json
// 2. 自定义请求头
// 3. 非普通请求 patch、put、delete

// app.get('/user',(req,res)=>{
//     res.json({
//         data:'success',
//         code:200
//     })
// })

// 支持返回json格式数据
app.use(express.json())

// 获取当前文件的路径和目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 路由模块
routes(app);


/**
 * 异常处理器
 */
app.use(defaultErrorHandle)

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})