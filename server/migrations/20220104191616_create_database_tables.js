//npx knex migrate:latest
exports.up = function(knex) {
  return knex.schema
    .createTable("user", (tbl) => {
        tbl.increments(); // id
        tbl.string("username", 128).unique().notNullable().index();
        tbl.string("password", 128).notNullable();
        tbl.timestamps(true, true);
    })

    .createTable("game", (tbl) => {
        tbl.integer("id").primary();
        tbl.string("description", 128).notNullable();
        tbl.integer("row").unsigned().notNullable();
        tbl.integer("column").unsigned().notNullable();
        tbl.timestamps(true, true);
    })

    .createTable("scores", (tbl) => {
        tbl.increments();
        
        tbl
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("user");

            tbl
            .integer("game_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("game");

        tbl.integer("score").unsigned().notNullable();
        tbl.timestamps(true, true);
    });
};
//npx knex migrate:rollback
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("scores").dropTableIfExists("user").dropTableIfExists("game");
};
