import express from 'express';
import routes from './routes/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import defaultErrorHandle from './error/error.js';

const app = express();
const port = 3000;

// CORS 设置
app.use('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,AC-User-Agent,token,Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// 支持 JSON 格式数据
app.use(express.json());

// 获取当前文件的路径和目录名
// 这里会导致 Cannot set headers after they are sent to the client ，所以不能注释20240611
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads', 'videos')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));

// 路由模块
routes(app);

// 异常处理器
app.use(defaultErrorHandle);

// 启动 HTTP 服务器
app.listen(port, () => {
    console.log(`HTTP Server running on port ${port}`);
});

