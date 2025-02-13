exports.up = function (knex) {
  return knex.schema
    .createTable("user", (tbl) => {
      tbl.increments();
      tbl.string("email", 128).notNullable();
      tbl.string("first_name", 128).notNullable();
      tbl.string("password", 128).notNullable();
      tbl.string("zip_code", 128);
    })
    .createTable("wine", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.binary("label_image", 128);
      tbl.integer("year").unsigned();
      tbl.string("color", 128).notNullable();
      tbl.string("vineyard", 128).notNullable();
      tbl.string("type", 128).notNullable();
    })
    .createTable("user_wine", (tbl) => {
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user");
      tbl
        .integer("wine_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("wine")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["user_id", "wine_id"]);
      tbl.boolean("favorite");
      tbl.boolean("try", 128);
      tbl.integer("").unsigned();
      tbl.string("notes", 128);
      tbl.string("", 128).notNullable();
    })
    .createTable("following", (tbl) => {
      tbl
        .integer("follower_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user");
      tbl
        .integer("following_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["follower_id", "following_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("user")
    .dropTableIfExists("wine")
    .dropTableIfExists("user_wine")
    .dropTableIfExists("following");
};
