import followModel from '../models/follow.model.js'

const createFollowerService = async(user_id,follow_id)=>{
    // 逻辑-自己不能关注自己-todo24-05-30

    // 逻辑-关注之后不能再关注-todo2024-05-30

    try{
        const result =await followModel.createFollowModel(user_id,follow_id)

        if (result.affectedRows > 0) {
            return { };
        }
    }
    catch(error){
        throw new Error('INSERT_INTO_ERROR')
    }
}

const deleteFollowerService = async(user_id,follow_id)=>{
    try{
        const result = await followModel.deleteFollowModel(user_id,follow_id)

        if(result.affectedRows>0){
            return {}
        }else {
            throw new Error('INSERT_INTO_FILED');
        }
    }
    catch(error){
        throw new Error(error)
    }
}

export default {
    createFollowerService,
    deleteFollowerService
}
