import auth from './auth.js'
import post from './post.routes.js'
import user from './user.js'
import viderUpload from './videoUpload.router.js'
import videoInfo from './videoInfo.router.js'

// 这里的导出的作用？-20240424
export default (app) =>{
    app.use('/v0/auth',auth)
    app.use('/v0/post',post)

    // me 页面用户信息【20240511】
    app.use('/v1/user',user)
    //文件上传【20240522】
    app.use('/v1/files',viderUpload)
    // 获取视频信息
    app.use('/v1/video',videoInfo)
}

// export default auth