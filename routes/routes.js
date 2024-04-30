import auth from './auth.js'
import post from './post.routes.js'

// 这里的导出的作用？-20240424
export default (app) =>{
    app.use('/auth',auth)
    app.use('/post',post)
}

// export default auth