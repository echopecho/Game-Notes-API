exports.up = function(knex) {
  return knex.schema.alterTable("characters", table => {
    table.string("player_name").alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("characters", table => {
    table
      .string("player_name")
      .notNullable()
      .alter();
  });
};
