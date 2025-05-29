class IO{

    static throwError(res, message){
        res.status(200).send({ error_message: message });
    }
    
    static throwDBError(res, message){
        res.status(500).send({ error_message: message });
    }
    
    static throwResult(res, { message, data }){
        message = message ? message : "";
        data = data ? data : {};
        res.send({ error_message: "", message: message, data: data });
    }

}

module.exports = IO;