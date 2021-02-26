const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create
};

async function getAll(author_id) {
  const kingdoms = db("kingdoms").where({ author_id });
  return kingdoms;
}

async function create(kingdom) {
  const [{ id }] = await db("kingdoms").insert(kingdom, ["id"]);
  return findByID(id);
}

function findByID(id) {
  return db("kingdoms")
    .where({ id })
    .first();
}
