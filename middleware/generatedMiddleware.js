
export const generateMiddleware = (schema) =>{
  return (req, res, next) => {
    // Middleware logic
    if (schema) {
      console.log(req.body)
      const result = schema.validate(req.body);
      if (result.error) {
        return res
          .status(400)
          .json({ message: "Validation error", errors: result.error.details });
      }
    }
    next();
  };
}

