exports.up = function(knex) {
  return knex.schema
    .table("kingdoms", table => {
      table
        .uuid("campaign_id")
        .references("id")
        .inTable("campaigns")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .table("locations", table => {
      table
        .uuid("campaign_id")
        .references("id")
        .inTable("campaigns")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .table("npcs", table => {
      table
        .uuid("campaign_id")
        .references("id")
        .inTable("campaigns")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .table("notes", table => {
      table
        .uuid("campaign_id")
        .references("id")
        .inTable("campaigns")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .table("kingdoms", table => {
      table.dropColumn("campaign_id");
    })
    .table("locations", table => {
      table.dropColumn("campaign_id");
    })
    .table("npcs", table => {
      table.dropColumn("campaign_id");
    })
    .table("notes", table => {
      table.dropColumn("campaign_id");
    });
};
