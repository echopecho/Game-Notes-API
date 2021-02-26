const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  create,
  findUsername,
  findByID,
};

async function getAll() {
  const users = await db("users");
  return users;
}

async function create(user) {
  const newUser = { ...user, username: user.username.toLowerCase() };
  try {
    const [{ id }] = await db("users").insert(newUser, ["id"]);
    return findByID(id);
  } catch (error) {
    if (error.constraint.includes("username_unique")) {
      throw new Error("Username is taken. Please try another.");
    }
  }
}

async function findUsername(userInfo) {
  const username = userInfo.toLowerCase();
  const user = await db("users")
    .where({ username: username })
    .orWhere({ email: username })
    .first();
  return user;
}

async function findByID(id) {
  const { password, ...user } = await db("users").where({ id }).first();
  return user;
}
