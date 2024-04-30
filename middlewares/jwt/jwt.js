import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

const verifyToken = (token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,config.jwtSecret,(err,decoded)=>{
            if(err){
                console.log('token verify err',err);
                reject(err)
            }else{             
                resolve(decoded)
            }
            
        })
    })
}

const verifyTokenMid = async(req,res,next)=>{
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).send({
            code: 401,
            message: 'Token not provided',
        });
    }
   try {
        // 去除空格
        const tokenStr = token.replace('Bearer ','')
        const decoded = await verifyToken(tokenStr)
        // 将用户信息存储在请求对象中
        req.user = decoded
        next()
   } catch (error) {
        // 再做细致化处理
        return res.status(401).send({
            code:401,
            message:"token 验证失败。"
        })
   }
}

export default verifyTokenMid

