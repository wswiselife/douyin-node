import userModel from '../../models/user.model/user.model.js'

const userinfoUpdate = async(req,res)=>{
    const {user_id} = req.user
    const userData = req.body

    // console.log(userData.avatar)

    try{
        const result = await userModel.updateModel(userData,user_id)

        if(result.affectedRows >0){
            res.send({
                code:200,
                message:"个人信息数据更新成功！",
                data:{}
            })
        }
    }
    catch{
        res.send({
            code: 500,
            message:'更新失败！'
        })
    }
}

const getUserinfo =async (req,res)=>{
    const {user_id} = req.user
    // console.log('user_id',user_id);
    const [result,filed] = await userModel.findManyModel(user_id)
    res.status(200).send({
        code:200,
        data:{
            result:result[0]
        }
    })
}

export default{
    userinfoUpdate,
    getUserinfo
}