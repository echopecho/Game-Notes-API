const router = require("express").Router();

const PCS = require("./pc-helper.js");

router.get("/", async (req, res) => {
  try {
    const newPC = await PCS.getAll();
    res.status(200).json(newPC);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

router.post("/", async (req, res) => {
  const pc = req.body;

  try {
    const newPC = await PCS.create(pc);
    res.status(201).json(newPC);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

module.exports = router;
