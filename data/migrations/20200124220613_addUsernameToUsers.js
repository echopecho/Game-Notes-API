exports.up = function(knex) {
  return knex.schema.table("users", table => {
    table
      .string("username")
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table("users", table => {
    table.dropColumn("username");
  });
};
