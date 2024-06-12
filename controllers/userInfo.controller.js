import userInfoService from '../service/userInfo.service.js'

const updateUserInfoController = async(req,res,next)=>{
    const {user_id} = req.user
    const userData = req.body

    try{
        const result = userInfoService.updateUserInfoService(userData,user_id)
        if(result){
            res.status(200).send({
                code:200,
                data:result,
                message:'更新个人信息成功'
            })
        }
    }
    catch (error) {
        next(error)
    }
}

const getUserInfoController =async (req,res,next)=>{
    const {user_id} = req.user

    try{
        const result = await userInfoService.getUserInfoService(user_id)

        if(result){
            res.status(200).send({
                code:200,
                data:result,
                message:'获取个人信息成功'
            })
        }

    }
    catch(error){
        next(error)
    }

}

/**
 * 获取发布我的视频
 */
const getMyVideoController =async (request,response,next)=>{
    const {user_id}  = request.user
    try{
        const result = await userInfoService.getMyVideoService(user_id)
        if(response){
            response.status(200).send({
                code:200,
                message:'获取视频成功！',
                data:result
            })
        }
    }catch(error){
        next(error)
    }
}

export default{
    updateUserInfoController,
    getUserInfoController,
    getMyVideoController
}