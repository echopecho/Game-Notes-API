const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create,
  update,
  remove
};

async function getAll() {
  const locations = db("locations");
  return locations;
}

async function create(location) {
  const [{ id }] = await db("locations").insert(location, ["id"]);
  return findByID(id);
}

async function update(location) {
  const [{ id }] = await db("locations")
    .where("id", location.id)
    .update(location, ["id"]);
  return findByID(id);
}

function remove(id) {
  return db("locations")
    .where({ id })
    .del();
}

function findByID(id) {
  return db("locations")
    .where({ id })
    .first();
}
