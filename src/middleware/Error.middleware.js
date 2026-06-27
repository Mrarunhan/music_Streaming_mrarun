const errorMiddlewere = (err, req, res, next) => {


    err.message = err.message || "Some problem here";
    err.statusCode = err.statusCode || 500;
    err.stack = err.stack 


    if(err.code === 11000){
        const field = Object.keys(err.keyPattern)[0];

       err.message = `${field} is already`
    }

    if(process.env.NODE_ENV === 'development'){
        console.log(err.message , err.stack, err.statusCode);

        res.status(err.statusCode).json({
            message : err.message,
           
        })
    }else{
        res.status(500).json({
            message : err.message
        })
    }

    
}

module.exports = errorMiddlewere