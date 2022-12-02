exports.up = (knex) => {
  return knex.schema.hasTable("testing").then((exists) => {
    if (exists) {
      return knex.schema.table("testing", (table) => {
        table.index(["phone"], "indx_phone");
      });
    }
    return false;
  });
};

exports.down = (knex) => {
  return knex.schema.hasTable("testing").then((exists) => {
    if (exists) {
      return knex.schema.table("testing", (table) => {
        table.dropIndex(["phone"], "indx_phone");
      });
    }
    return false;
  });
};
