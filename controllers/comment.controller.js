import commentService from '../service/comment.service.js'

const getCommentController =async (request,response,next)=>{

    const {video_id} = request.body

    if(!video_id){
        return next(new Error('FIELD_MISSING'))
    }

   try{
       const result = await commentService.getCommentService(video_id)

       if(result){
           response.status(200).send({
               code:200,
               message:"返回评论成功！",
               data:result
           })
       }
   }catch(error){
      next(error)
   }
}

const createCommentController =async (request,response,next)=>{
    const {user_id} = request.user

    const {video_id,content,parent_id} = request.body


    if(!video_id){
        return next(new Error('FIELD_MISSING'))
    }

    if(!content){
        return next(new Error('FIELD_MISSING'))
    }

    if(!parent_id){
        return next(new Error('FIELD_MISSING'))
    }

    const data = {
        user_id,
        video_id,
        content,
        parent_id
    }
    // 传递的数据格式，写法要统一规范
    // 函数返回的结果result，传递的对象response，返回前端的数据data
    console.log(data)

    try{
        const result = await commentService.createCommentService(data)

        if(result){
            response.status(200).send({
                code:200,
                data:result
            })
        }
    }
    catch(error){
        next(error)
    }
}

const deleteCommentController =async (request,response,next)=>{
    const {user_id} = request.user

    const {comment_id} = request.body

    try{
        const result = await commentService.deleteCommentService({user_id,comment_id})

       if(result){
           response.status(200).send({
               code:200,
               data:result,
               message:'删除成功'
           })
       }

    }catch(error){
        next(error)
    }
}

export default {
    getCommentController,
    createCommentController,
    deleteCommentController
}