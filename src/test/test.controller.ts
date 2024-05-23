import {Request, Response, NextFunction} from 'express'
import {testService} from './test.service'

/**
 * 内容列表
 */
export const testController = async(
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    /**
     * 捕获全局错误
     */
    try {
        /**
         * 错误处理在这里进行
         */
        // if(request.headers.authorization !== 'secret'){
        //     // 这里需要利用next且return
        //     return next(new Error())
        // }
        const data =await testService()
        response.send(data)
    } catch (error) {
        // 这里直接往下抛
        next(error)
    }
}