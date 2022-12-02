exports.up = knex => {
    return knex
      .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .then(() =>
        knex.raw("CREATE SEQUENCE IF NOT EXISTS seq_serial_10th START 10000")
      )
      .then(() => knex.schema.hasTable("testing"))
      .then(exists => {
        if (!exists) {
          return knex.schema.createTable("testing", table => {
            table
              .string("id")
              .primary()
              .notNullable()
              .defaultTo(knex.raw("nextval('seq_serial_10th')"));
            table.boolean("is_promotional");
            table.string("first_name",15).notNullable();
            table.string("last_name");
            table.varchar("phone").checkLength('=',10).notNullable();
            table.jsonb("address");
            table.boolean("verified");
            table
              .uuid("user_actual_id")
              .notNullable()
              .unique()
              .defaultTo(knex.raw("uuid_generate_v4()"));
          });
        }
        return false;
      });
  };
  
  exports.down = knex => {
    return knex.schema.dropTable("testing");
  };
  