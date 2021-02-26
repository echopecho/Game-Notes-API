const router = require("express").Router();
const Kingdoms = require("./kingdom-helper.js");
const { verify } = require("../util/middleware.js");

router.get("/", verify, async (req, res) => {
  const user_id = req.decodedToken.subject;

  try {
    const kingdoms = await Kingdoms.getAll(user_id);
    res.status(200).json(kingdoms);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.post("/", async (req, res) => {
  const kingdom = req.body;

  try {
    const newKingdom = await Kingdoms.create(kingdom);
    res.status(201).json(newKingdom);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server" });
  }
});

module.exports = router;
