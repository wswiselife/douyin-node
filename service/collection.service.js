import collectionModel from '../models/collection.model.js'

const createCollectionService = async({video_id,user_id})=>{

    try{
        const result = await collectionModel.createModel({video_id,user_id})

        if(result.affectedRows>0){
            return {}
        }
    }
    catch(error){
        throw new Error(error)
    }
}

const deleteCollectionService = async ({video_id,user_id})=>{
    try{
        console.log(video_id,user_id)
        const result = await collectionModel.deleteCollectionModel({video_id,user_id})

        console.log('service',result)
        if(result.affectedRows>0){
            return {}
        }
        else {
            // 为什么这里不经过统一处理呢，返回的仅仅时字符串，而不是对应的信息

            //gpt 解释
            // 你提到的问题在于 deleteCollectionService 函数内部抛出的错误并没有通过统一的错误处理函数进行处理。这是因为在你的 catch 块中，错误被捕获后重新抛出，但没有附带适当的错误类型，导致错误信息被转换成普通字符串。
            throw new Error('DELETE_FILED');
        }
    }
    catch(error){
        //处理 这里直接throw
        throw error
    }
}

export default {
    createCollectionService,
    deleteCollectionService
}