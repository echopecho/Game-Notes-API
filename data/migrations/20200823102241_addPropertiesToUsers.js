exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("email").unique().notNullable();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.boolean("emailConfirmed").default(false);
    table.timestamp("created_at").default(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("email");
    table.dropColumn("firstName");
    table.dropColumn("lastName");
    table.dropColumn("emailConfirmed");
    table.dropColumn("created_at");
  });
};
