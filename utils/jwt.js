import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const generateToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {expiresIn: 60 * 60 * 24 * 7})
}

export default {
    generateToken
}