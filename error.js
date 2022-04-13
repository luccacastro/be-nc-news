exports.handlePsqlError = (err, req,res, next) => {
    if(err.code ==="22P02") res.status(400).send({msg: 'bad error'})
    else next(err)
}

exports.invalidRouteHandler = (err,req,res,next) => {
    res.status(404).send({error:"Route doesn't exist"})
}

exports.getServerErrorHandler = (err,req,res,next) =>{
        // if(err.code == "23503"){
        //     err.message = ""
        // }
        if(err){
            res.status(err.status || 500);
            res.send({
                message: err.message
            });
            // console.log(err)
        }else{
            next(err)
        }
        
}