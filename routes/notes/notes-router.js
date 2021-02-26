const router = require("express").Router();
const Notes = require("./notes-helper.js");
const { verify } = require("../util/middleware.js");

router.get("/", verify, async (req, res) => {
  const user_id = req.decodedToken.subject;
  try {
    const notes = await Notes.getAll(user_id);
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const notes = await Notes.getCampaignNotes(id);
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

router.post("/", async (req, res) => {
  const { note, tags = [] } = req.body;
  try {
    const newNote = await Notes.create(note, tags);
    res.status(202).json(newNote);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/:id/tags", async (req, res) => {
  const { tags } = req.body;
  const { id } = req.params;
  try {
    const newTags = await Notes.makeTags(tags, id);
    res.status(201).json(newTags);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

router.put("/:id", async (req, res) => {
  const note = req.body;
  const { id } = req.params;
  note.id = id;
  try {
    const updatedNote = await Notes.update(note);
    res.status(202).json(updatedNote);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Notes.remove(id);
    res.status(201).json({ message: "Note was successfully deleted." });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

module.exports = router;
