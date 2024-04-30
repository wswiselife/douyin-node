import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const generateToken = (payload)=>{
    return jwt.sign(payload,config.jwtSecret,{expiresIn: 10*60})
} 

export default {
    generateToken
}