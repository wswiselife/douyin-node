import videoLikeModel from '../models/videoLike.model.js'

const createVideoLikeService =async ({user_id,video_id})=>{

    // 逻辑-todo-20240531-重复喜欢问题处理

    try{
        const result = await videoLikeModel.createModel({user_id,video_id})
        if(result.affectedRows>0){
            return {}
        }
    }
    catch(error){
        throw new Error('INSERT_INTO_ERROR')
    }
}

const deleteVideoLikeService = async({user_id,video_id})=>{
    try {
        const result = await videoLikeModel.deleteModel({user_id,video_id})
        if(result.affectedRows>0){
            return {}
        }
    }
    catch(error){
        throw new Error('DELETE_ERROR')
    }
}


export default {
    createVideoLikeService,
    deleteVideoLikeService
}
