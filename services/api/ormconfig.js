module.exports = {
    "type": "postgres",
    "host": process.env.DATABASE_HOST,
    "port": 5432,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME,
    "synchronize": false,
    "logging": true,
    "entities": [
       "src/entity/**/*.ts"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration"
    }
 }
 