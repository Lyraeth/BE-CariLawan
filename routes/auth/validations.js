const jwt = require("jsonwebtoken");

const accessValidation = (req, res, next) => {
  const validationReq = req;
  const { authorization } = validationReq.headers;

  console.log("here: ", authorization);

  if (!authorization) {
    return res.status(401).json({
      message: "Token required",
    });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  try {
    const jwtDecode = jwt.verify(token, secret);

    if (typeof jwtDecode !== "string") {
      validationReq.userData = jwtDecode;
    }
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  next();
};

module.exports = { accessValidation };
