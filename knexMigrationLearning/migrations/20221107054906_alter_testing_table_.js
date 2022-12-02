exports.up = (knex) => {
  return knex.schema.hasTable("testing").then((exists) => {
    if (exists) {
      return knex.schema.table("testing", (table) => {
        table.varchar("phone").checkLength("=", 10).notNullable().unique().alter();
      });
    }
    return false;
  });
};

exports.down = (knex) => {
  return knex.schema.hasTable("testing").then((exists) => {
    if (exists) {
      return knex.schema.table("testing", (table) => {
        table.varchar("phone").checkLength("=", 10).notNullable().alter();
      });
    }
    return false;
  });
};
