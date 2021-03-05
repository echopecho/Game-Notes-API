const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create,
  getByCampaignId,
};

async function getAll(author_id) {
  const kingdoms = db("kingdoms").where({ author_id });
  return kingdoms;
}

function getByCampaignId(author_id, campaign_id) {
  return db("kingdoms").where({ author_id }).andWhere({ campaign_id });
}

async function create(kingdom) {
  const [{ id }] = await db("kingdoms").insert(kingdom, ["id"]);
  return findByID(id);
}

function findByID(id) {
  return db("kingdoms").where({ id }).first();
}
