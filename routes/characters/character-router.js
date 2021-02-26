const router = require("express").Router();
const Char = require("./character-helper.js");
const { verify } = require("../util/middleware.js");

router.get("/", verify, async (req, res) => {
  const user_id = req.decodedToken.subject;

  try {
    const npcs = await Char.getAll(user_id);
    res.status(200).json(npcs);
  } catch (e) {
    res.status(5000).json({ message: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const npc = await Char.findByName(name);
    res.status(200).json(npc);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/new", async (req, res) => {
  const npc = req.body;
  if (npc.name) {
    try {
      const newNPC = await Char.create(npc);
      res.status(201).json(newNPC);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(422).json({ message: "Please provide a valid name" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Char.remove(id);
    res.status(201).json({ message: "That character was deleted" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
