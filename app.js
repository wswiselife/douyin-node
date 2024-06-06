import express from 'express';
import routes from './routes/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import defaultErrorHandle from './error/error.js';
import fs from 'fs';
import https from 'https';
import http from 'http';

// 读取证书和私钥文件
const privateKey = fs.readFileSync('./https/wuweibin.com.key', 'utf8');
const certificate = fs.readFileSync('./https/wuweibin.com_bundle.crt', 'utf8');
const ca = fs.readFileSync('./https/wuweibin.com_bundle.pem', 'utf8');

// 创建证书对象
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
    minVersion: 'TLSv1.2',
    maxVersion: 'TLSv1.3'
};

const app = express();
const port = 3000;
const sslport = 3001;

// CORS 设置
app.use('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,AC-User-Agent,token,Authorization');
    next();
});

// 支持 JSON 格式数据
app.use(express.json());

// 获取当前文件的路径和目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 路由模块
routes(app);

// 异常处理器
app.use(defaultErrorHandle);

// 处理 HTTP 到 HTTPS 的重定向
app.use((req, res, next) => {
    if (req.protocol === 'http') {
        res.redirect(301, `https://${req.headers.host}${req.url}`);
    } else {
        next();
    }
});

// 创建 HTTP 和 HTTPS 服务器
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// 启动 HTTP 服务器
httpServer.listen(port, () => {
    console.log(`HTTP Server running on port ${port}`);
});

// 启动 HTTPS 服务器
httpsServer.listen(sslport, (err) => {
    if (err) {
        console.error('Error starting HTTPS server:', err);
    } else {
        console.log(`HTTPS Server running on port ${sslport}`);
    }
});
