import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                console.log('token verify err', err);
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

const verifyTokenMid = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token', token);

    if (!token || token === 'Bearer null') {
        // 如果没有 token 或 token 为 'Bearer null'，直接跳过验证
        next();
    } else {
        try {
            const tokenStr = token.replace('Bearer ', '').trim();
            const decoded = await verifyToken(tokenStr);
            req.user = decoded;
            next();
        } catch (error) {
            // 处理无效的 token
            return res.status(401).send({
                code: 401,
                message: "token 验证失败。"
            });
        }
    }
};

export default verifyTokenMid;
