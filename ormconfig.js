const env = process.env;

module.exports = {
  type: env.TYPEORM_CONNECTION,
  host: env.TYPEORM_HOST,
  port: env.TYPEORM_PORT,
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,
  synchronize: false,
  entities: [
    "src/entity/**/*.ts"
  ],
  migrations: [
    "src/migration/**/*.ts"
  ],
  seeds: [
    "src/seeds/**/*.ts"
  ],
  factories: [
    "src/factories/**/*.ts"
  ],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
  },
  logging: true
};
