// const express = require('express')
import express from 'express'
import routes from './routes/routes.js'

const app = express()
const port = 3000

// 跨域cros
app.use('*',(req,res,next)=>{
    // 允许资源访问路径 */指定ip
    res.setHeader('Access-Control-Allow-Origin','*')    // '*'或'Origin'
    // 允许使用的请求方法   get\post\head为默认
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    // 默认只支持三种相应头，需要支持application/json要设置content-type
    res.setHeader('Access-Control-Allow-Headers','Content-Type')
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

// 路由模块
routes(app);

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})