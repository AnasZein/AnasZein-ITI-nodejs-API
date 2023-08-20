const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let Authorization = req.headers.authorization;
  jwt.verify(Authorization, process.env.JWT_SECRET, function (error, decoded) {
    if (decoded) {
      req.user = decoded.data;
      next();
    }
    if (error) {
      res.status(401).json({ err: error.message });
    }
  });
}

module.exports = { auth };
