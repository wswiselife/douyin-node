
const defaultErrorHandle = (error,request,response,next)=>{
    console.error('错误信息', error); // 打印错误信息以便调试
    // 打印错误信息和堆栈跟踪
    if (error.message) {
        console.error('错误信息:', error.message);
    }
    // if (error.stack) {
    //     console.error('错误堆栈:', error.stack);
    // }

    let statusCode
    let message

    switch (error.message) {
        case 'CASE_MYSELF':
            statusCode = 400
            message = '不允许关注自己'
            break
        case 'INSERT_INTO_ERROR':
            statusCode = 500
            message = '插入操作失败！'
            break

        case 'INSERT_INTO_FILED':
            statusCode = 400
            message = '插入操作未成功！'
            break

        case 'DELETE_ERROR':
            statusCode = 500
            message = '删除操作失败！'
            break

        case 'DELETE_FILED':
            statusCode = 400
            message = '删除操作未成功！'
            break

        case 'FIELD_MISSING':
            statusCode = 400
            message = '字段缺失！'
            break



        default:
            statusCode= 500
            message= error.message
            break
    }

    response.status(statusCode).send(message)
}

export default defaultErrorHandle