export const generateMiddleware= (schema) =>{
    return (req, res, next)=>{
        if(schema){
            const result = schema.validate(req.body, (err, value) =>{
                console.log(result);
                if(result.error){
                    return res
                        .status(400)
                        .json({message: "Validation error", errors: result.error.details})
                }
            })


        }
        next();
    }
}