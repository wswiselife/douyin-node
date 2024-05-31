import commentModel from '../models/comment.model.js'

const getCommentService = async(video_id)=>{

   try{
       const result= await commentModel.findMany({video_id})
       console.log('service result',result)
       if(result){
           return result
       }


   // 这里不做错误处理，因为不会走统一处理接口
   }catch(error){
       throw new Error(error)
   }
}

const createCommentService = async (data)=>{

    // console.log(data)
    const {video_id,user_id,content,parent_id} = data

    try{
        const result = await commentModel.create({video_id,user_id,content,parent_id})

        if(result.affectedRows>0){
            return {}
        }
    }
    catch(error){
        throw new Error('INSERT_INTO_ERROR')
    }
}

const deleteCommentService = async (data)=>{
    const {comment_id,video_id,user_id} = data

    //自己才有权限删除自己的评论-有bug-20240530
    try{
        const result = await commentModel.deleteModel({comment_id})

        if(result.affectedRows>0){
            return {}
        }
    }
    catch(error){
        throw new Error('DELETE_ERROR')
    }
}

export default {
    getCommentService,
    createCommentService,
    deleteCommentService
}