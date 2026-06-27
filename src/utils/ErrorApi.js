class ErrorApi extends Error {
    constructor(message , statusCode){
        super(message);

        this.name = "ErrorApi"
       
        this.statusCode = statusCode;


        if(Error.captureStackTrace){
            Error.captureStackTrace(this, ErrorApi)
        }
    }
}

module.exports = ErrorApi;