const errorHandler = (code,message)=>{
    console.log('err',err.message);
    res.status(500).send(err.message);
}

const errorMiddleware = ()=>{
    
}

export default errorHandler