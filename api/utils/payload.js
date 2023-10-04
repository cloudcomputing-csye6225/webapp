import { setResponse } from "./response.js";

export const checkPayloadBody = (req, res, next) => {
  const check = Object.keys(req.body).length || Object.keys(req.query).length;
  if (check) {
    setResponse(res, 400);
  } else {
    return next();
  }
};

export const checkPayLoadForPost = (compulsory, optional) => {
  return (req, res, next) => {
    const check = Object.keys(req.body).length;
    if (check) {
      const keys = Object.keys(req.body);
      const missing = compulsory.filter((item) => !keys.includes(item));
      if (missing.length) {
        setResponse(
          res,
          400,
          `Missing compulsory fields: ${missing.join(", ")}`
        );
      } else {
        const extra = keys.filter(
          (item) => !compulsory.includes(item) && !optional.includes(item)
        );
        if (extra.length) {
          setResponse(res, 400, `Extra fields: ${extra.join(", ")}`);
        } else {
          optional.forEach((item) => {
            if (req.body[item]) {
              delete req.body[item];
            }
          });
          return next();
        }
      }
    } else {
      setResponse(res, 400);
    }
  };
};

export const checkPayLoadForPutRequest = (schema, optional) => {
  return (req, res, next) => {
    const requestBodyKeys = Object.keys(req.body);

    // Check if there are any properties outside the schema
    const hasInvalidProperties = requestBodyKeys.some(
      (property) => !schema.includes(property)
    );

    // Check if there are any properties from the schema
    const hasSchemaProperties = requestBodyKeys.some((property) =>
      schema.includes(property)
    );

    if (hasInvalidProperties || !hasSchemaProperties) {
      // If there are invalid properties or no properties from the schema, return a 400 Bad Request response
      setResponse(res, 400);
    } else {
      // Remove optional properties from the request body
      for (const key of optional) {
        if (req.body[key]) {
          delete req.body[key];
        }
      }

      // Continue processing the request
      return next();
    }
  };
};
