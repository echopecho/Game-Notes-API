const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  findByName,
  create,
  remove,
  getByCampaignId,
};

async function getAll(author_id) {
  const chars = await db("characters").where({ author_id });
  return chars;
}

function getByCampaignId(author_id, campaign_id) {
  return db("characters").where({ author_id }).andWhere({ campaign_id });
}

async function findByName(name) {
  const npc = await db("characters as n")
    .join("locations as l", "n.location_id", "l.id")
    .where("n.name", name)
    .select(
      "n.id",
      "n.name",
      "n.description",
      "n.created_at",
      "l.name as location"
    );
  return npc;
}

async function create(npc) {
  const [{ id }] = await db("characters").insert(npc, ["id"]);
  return findByID(id);
}

function remove(id) {
  return db("characters").where({ id }).del();
}

function findByID(id) {
  return db("characters").where({ id }).first();
}
