const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create,
  remove,
  update,
  addDestination,
};

async function getAll(author_id) {
  const campaigns = await db("campaigns")
    .where({ author_id })
    .orderBy("created_at", "desc");
  const result = await addJournies(campaigns);
  return result;
}

async function create(campaign) {
  const { author_id } = campaign;
  const [{ id }] = await db("campaigns").insert(campaign, ["id"]);
  await db("locations").insert({
    name: "Traveling...",
    description: "",
    campaign_id: id,
    author_id,
  });
  return getByID(id);
}

async function update(campaign) {
  const [{ id }] = await db("campaigns")
    .where("id", campaign.id)
    .update(campaign, ["id"]);
  return getByID(id);
}

async function addDestination(des) {
  await db("journies").insert(des);
}

function remove(id) {
  return db("campaigns").where({ id }).del();
}

function getByID(id) {
  return db("campaigns").where({ id }).first();
}

async function addJournies(campaigns) {
  return Promise.all(
    campaigns.map(async (campaign) => {
      const journey = await db("journies as j")
        .where("j.campaign_id", campaign.id)
        .andWhere("j.author_id", campaign.author_id)
        .orderBy("created_at")
        .join("locations as l", "j.location_id", "l.id")
        .select("l.name", "j.created_at");
      campaign.journey = journey;
      return campaign;
    })
  );
}
