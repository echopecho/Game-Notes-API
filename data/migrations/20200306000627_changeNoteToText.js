exports.up = function(knex) {
  return knex.schema.alterTable("notes", table => {
    table
      .text("text")
      .notNullable()
      .alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("notes", table => {
    table
      .string("text")
      .notNullable()
      .alter();
  });
};
