const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create
};

function getAll() {
  return db("pcs");
}

async function create(pc) {
  const [{ id }] = await db("pcs").insert(pc, ["id"]);
  return findByID(id);
}

function findByID(id) {
  return db("pcs")
    .where({ id })
    .first();
}
