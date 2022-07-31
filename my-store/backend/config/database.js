// const path = require('path');

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'sqlite',
//     connection: {
//       filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//     },
//     useNullAsDefault: true,
//   },
// });

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost2'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'danishtanoli'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'Muhammad123456'),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
      
      ssl: false,
    },
    debug: false,
  },
});


