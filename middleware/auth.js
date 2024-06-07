const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token =
    req.headers["Cookie"] ||
    req.headers["cookie"] ||
    req.headers["authToken"] ||
    req.headers["authtoken"];
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
