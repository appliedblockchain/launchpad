import { Connection } from "typeorm";

export async function clearDB(connection: Connection) {
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
      const repository = await connection.getRepository(entity.name);
      await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
    }
  }