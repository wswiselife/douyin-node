import collectionService from '../service/collection.service.js'

const createCollectionController = async(request,response,next)=>{
    const {user_id} = request.user

    const {video_id} = request.body

    try{
        const result = await collectionService.createCollectionService({user_id,video_id})

        if(result){
            response.status(200).send({
                code:200,
                data:result,
                message:'收藏成功'
            })
        }
    }
    catch (error) {
        next(error)
    }
}

const deleteCollectionController = async(request,response,next)=>{
    const {user_id}  = request.user

    const {video_id} = request.body

    try{
        const result = await collectionService.deleteCollectionService({user_id,video_id})
        console.log(result)
        if(result){
            response.status(200).send({
                code:200,
                data:result,
                message:'取消收藏成功'
            })
        }
    }
    catch (error) {
        next(error)
    }
}

export default {
    createCollectionController,
    deleteCollectionController
}