const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("./user-model.js");
const { checkCred, verify } = require("../util/middleware.js");
const jwtSecret = process.env.JWT_SECRET;

router.get("/verify", verify, async (req, res) => {
  const user_id = req.decodedToken?.subject;
  try {
    const user = await Users.findByID(user_id);
    const token = generateToken(user);
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).json({ message: "Token is no longer vaild." });
  }
});

router.post("/register", checkCred, async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const newUser = await Users.create(user);
    const token = generateToken(newUser);
    res.status(201).json({ token, newUser });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post("/login", checkCred, async (req, res) => {
  const { username, password } = req.body;

  try {
    const { password: hash, ...user } = await Users.findUsername(username);
    if (bcrypt.compareSync(password, hash)) {
      const token = generateToken(user);
      res.status(200).json({ token, user });
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(500).json({ message: "Credentials provided are invalid." });
  }
});

router.get("/userinfo", async (req, res) => {
  const users = await Users.getAll();

  res.status(200).json(users);
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
