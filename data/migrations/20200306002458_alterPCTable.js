const classes = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard"
];

exports.up = function(knex) {
  return knex.schema
    .renameTable("pcs", "characters")
    .alterTable("characters", table => {
      table.text("description").alter();
    })
    .table("characters", table => {
      table
        .uuid("location_id")
        .references("id")
        .inTable("locations")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("level").defaultTo(1);
      table.enu("class", classes);
      table.text("backstory");
      table.boolean("user_char").defaultTo(0);
      table.boolean("player_char").defaultTo(0);
    });
};

exports.down = function(knex) {
  return knex.schema
    .table("character", table => {
      table.dropColumn("location_id");
      table.dropColumn("level");
      table.dropColumn("class");
      table.dropColumn("backstory");
      table.dropColumn("user_char");
      table.dropColumn("player_char");
    })
    .alterTable("characters", table => {
      table.string("description").alter();
    })
    .renameTable("characters", "pcs");
};
