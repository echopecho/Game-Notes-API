exports.up = function(knex) {
  return knex.schema.alterTable("notes-npcs", table => {
    table.unique(["note_id", "npc_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.table("notes-npcs", table => {
    table.dropUnique(["note_id", "npc_id"]);
  });
};
