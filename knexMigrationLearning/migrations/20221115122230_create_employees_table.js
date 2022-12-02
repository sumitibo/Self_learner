exports.up = (knex) => {
  return knex.schema.hasTable("employees").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("employees", (table) => {
        table.increments("id");
        table.string("first_name", 15).notNullable();
        table.string("last_name");
        table
          .uuid("employee_actual_id")
          .notNullable()
          .unique()
          .primary()
          .defaultTo(knex.raw("uuid_generate_v4()"));
      });
    }
    return false;
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("employees");
};
