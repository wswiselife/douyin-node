import videoLikeService from '../service/videoLike.service.js'

const createVideoLikeController =async (request,response,next)=>{
    const {user_id}  = request.user
    const {video_id} = request.body

    console.log(user_id,video_id)

    try{
        const result = await videoLikeService.createVideoLikeService({user_id,video_id})

        if(result){
            response.status(200).send({
                code:200,
                data:result,
                message:'点赞成功'
            })
        }
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

const deleteVideoLikeController = async (request,response,next)=>{
    const {user_id} = request.user

    const {video_id} = request.body

    try{
        const result = await videoLikeService.deleteVideoLikeService({user_id,video_id})

        if(result){
            response.status(200).send({
                code:200,
                data:result,
                message:'取消点赞成功'
            })
        }
    }
    catch(error){
        next(error)
    }


}

export default {
    createVideoLikeController,
    deleteVideoLikeController
}