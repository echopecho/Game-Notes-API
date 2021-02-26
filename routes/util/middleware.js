const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  checkCred,
  verify
};

function checkCred(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    next();
  } else {
    res
      .status(422)
      .json({ message: "Please provide both username and password" });
  }
}

function verify(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) res.status(401).json({ message: "User not verified" });

      req.decodedToken = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "User not verified" });
  }
}
