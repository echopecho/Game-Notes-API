const router = require("express").Router();
const Locations = require("./location-helper.js");

router.get("/", async (req, res) => {
  try {
    const places = await Locations.getAll();
    res.status(200).json(places);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server" });
  }
});

router.post("/", async (req, res) => {
  const loc = req.body;

  try {
    const newLoc = await Locations.create(loc);
    res.status(201).json(newLoc);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

router.put("/", async (req, res) => {
  const loc = req.body;

  try {
    const updatedLoc = await Locations.update(loc);
    res.status(201).json(updatedLoc);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Locations.remove(id);
    res
      .status(201)
      .json({ message: "That location was successfully deleted." });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

module.exports = router;
