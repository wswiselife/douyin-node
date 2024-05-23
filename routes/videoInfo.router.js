import express from "express";

import videoInfoController from '../controllers/videoInfo.controller.js'
import verifyTokenMid from '../middlewares/jwt/jwt.js'

const router = express.Router();

// 先处理已经登录了的，未登录的验证后续处理-2024-05-23
// 是否关注
router.post('/getVideo',verifyTokenMid,videoInfoController.getVideo)

// 点赞（用户id,视频id）

// 评论(用户id,视频id,评论内容,回复评论<后续>)

// 收藏（用户id,视频id）

//分享/music/相关搜索【后续】

export default router
