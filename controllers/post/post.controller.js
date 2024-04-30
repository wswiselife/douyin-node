import postModel from "../../models/post/post.model.js";

const getPostList = async(req,res)=>{
    try {
        const {user_id} = req.user
        const [result,fields] = await postModel.findManyModel(user_id)
        res.send({
            code:200,
            message:'',
            data:result
        })
    } catch (error) {
        throw new Error('error',error)
    }
}

const getPostItem = (req,res)=>{
    
}

const createPost = async(req,res)=>{
    const {title,content} = req.body
    const {user_id} = req.user

    const result = await postModel.createModel(user_id,title,content)
    if(result.affectedRows >0){
        res.status(200).send({
            code:200,
            message:'',
            data:{
                message:"新增成功。"
            }
        })
    }else{
        res.status(500).send({
            code:500,
            message:"服务器开小差啦！"
        })
    }
}

export default {
    getPostList,
    getPostItem,
    createPost
}