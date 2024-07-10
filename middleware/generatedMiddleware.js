
export const generateMiddleware = (schema) =>{
  return (req, res, next) => {
    // Middleware logic
    if (schema) {
      //console.log(req.body)
      const result = schema.validate(req.body);
      if (result.error) {
        return res
          .status(422)
          .json({ message: "errors", errors: result.error.details });
      }
    }
    next();
  };
}

