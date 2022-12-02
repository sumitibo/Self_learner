exports.up = knex => {
    return knex.schema.hasTable("testing").then(exists => {
      if (exists) {
        return knex.schema.table("testing", table => {
            table.dropColumn("is_promotional");
        });
      }
      return false;
    });
  };
  
  exports.down = knex => {
    return knex.schema.hasTable("testing").then(exists => {
      if (exists) {
        return knex.schema.table("testing", table => {
          table.boolean("is_promotional");
        });
      }
      return false;
    });
  };
  