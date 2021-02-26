exports.up = function(knex) {
  return knex.schema.dropTable("notes-npcs").dropTable("npcs");
};

exports.down = function(knex) {
  return knex.schema.createTable("npcs", table => {
    table.increments("id");
  });
};
