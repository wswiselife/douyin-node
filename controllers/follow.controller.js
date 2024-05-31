import followService from '../service/follow.service.js'

const createFollowerController = async (request, response, next) => {

    const {user_id} = request.user
    const {follow_id} = request.body

    if (!follow_id) {
        next(new Error('FIELD_MISSING'))
    }

    try {
        const result = await followService.createFollowerService(user_id, follow_id)

        if (result) {
            response.status(200).send({
                code: 200,
                data: result,
                message:'关注成功！'
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteFollowerController = async(request,response,next)=>{
    const {user_id} = request.user
    const {follow_id } = request.body

    try{
        const result = await followService.deleteFollowerService(user_id,follow_id)

        if(result){
            response.status(200).send({
                code:200,
                data:result,
                message:'取消关注成功'
            })
        }
    }
    catch(error){
        next(error)
    }

}

export default {
    createFollowerController,
    deleteFollowerController
}