const authValidate = (req,res,next)=>{
    const {account,password} = req.body
    // console.log('account,password',account,password);
    if(!account){
        return res.status(400).send({
            code:400,
            message:"账号不能为空！"
        })
    
    }
    if(!password){
        return res.status(400).send({
            code:400,
            message:"密码不能为空！"
        })
        
    }

    // 判断其他合理性【长度】
    next()
}

export default authValidate