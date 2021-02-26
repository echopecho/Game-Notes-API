exports.up = function(knex) {
  return knex.schema
    .table("notes", table => {
      table
        .uuid("author_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .table("kingdoms", table => {
      table
        .uuid("author_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .table("locations", table => {
      table
        .uuid("author_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .table("npcs", table => {
      table
        .uuid("author_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .table("notes", table => {
      table.dropColumn("author_id");
    })
    .table("kingdoms", table => {
      table.dropColumn("author_id");
    })
    .table("locations", table => {
      table.dropColumn("author_id");
    })
    .table("npcs", table => {
      table.dropColumn("author_id");
    });
};
