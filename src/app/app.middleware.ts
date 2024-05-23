import {Request, Response, NextFunction} from 'express'

/**
 * 内容列表
 */
export const validateMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    /**
     * 逻辑处理
     */

    next()
}

/**
 * 异常处理器
 */
export const defaultErrorHandler = (
    request: Request,
    response: Response,
    next: NextFunction,
    error: any
)=>{

    /**
     * 获取error中的message
     */
    if(error.message){
        // 日志记录todo
        console.log(error.message);
    }


    let statusCode: number
    let message: string

    /**
     * 处理异常
     */
    switch(error.message){

        // 错误处理在《上篇-5：58》
        case 'NAME_IS_REQUIRED':
            statusCode = 400
            message = '用户名不能为空'
            break
        case 'PASSWORD_IS_REQUIRED':
            statusCode = 400
            message = '用户密码不能为空'
            break
        default:
            statusCode = 500
            message = '服务暂时出了点小问题~~~'
            break
    }

    response.status(statusCode).send({message})
}