const router = require("express").Router();
const { verify } = require("../util/middleware.js");

const Campaigns = require("./campaign-helper.js");

router.get("/", verify, async (req, res) => {
  const user_id = req.decodedToken.subject;
  try {
    const campaigns = await Campaigns.getAll(user_id);
    res.status(201).json(campaigns);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

router.post("/", verify, async (req, res) => {
  const campaign = req.body;
  campaign.author_id = req.decodedToken.subject;

  try {
    const newCampaign = await Campaigns.create(campaign);
    res.status(201).json(newCampaign);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

router.put("/", verify, async (req, res) => {
  const campaign = req.body;
  campaign.author_id = req.decodedToken.subject;

  try {
    const updatedCamp = await Campaigns.update(campaign);
    res.status(201).json(updatedCamp);
  } catch (e) {
    res.status(500).json({
      message: "Server failed to update that campaign's information.",
    });
  }
});

router.delete("/:id", verify, async (req, res) => {
  const { id } = req.params;

  try {
    await Campaigns.remove(id);
    res.status(201).json({ message: "Campaign was successfully deleted." });
  } catch (e) {
    res.status(500).json({ message: "Server failed to delete that campaign." });
  }
});

router.post("/:campaign_id/journey", verify, async (req, res) => {
  const location = req.body;
  location.author_id = req.decodedToken.subject;
  location.campaign_id = req.params.campaign_id;

  try {
    await Campaigns.addDestination(location);
    res.status(201).json({ message: "Destination successfully added." });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to add destination to the campaigns journey." });
  }
});

module.exports = router;
