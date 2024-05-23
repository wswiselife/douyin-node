/**
 * 密码加密 bcrypt
 */


export const validateMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
)=>{
    /**
     * 逻辑处理
     */
    const {account,password} = request.body

    if(!account){
        return next(new Error('NAME_IS_REQUIRED'))
    }

    if(!password){
        return next(new Error('PASSWORD_IS_REQUIRED'))
    }

    /**
     * 验证用户名是否唯一
     */

    next()
}