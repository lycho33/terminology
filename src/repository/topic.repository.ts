import { Kysely } from "kysely";
import { DB } from "../types/types";

const findAllTopics = async (db: Kysely<DB>) => {
  return await db.selectFrom("Topic").selectAll().execute();
};

const findTopicById = (db: Kysely<DB>, id: number) => {
  return db
    .selectFrom("Topic")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
};

const findTopicByName = (db: Kysely<DB>, name: string) => {
  return db
    .selectFrom("Topic")
    .selectAll()
    .where("Topic.name", "=", name)
    .executeTakeFirst();
};

const createTopic = (db: Kysely<DB>, name: string) => {
  return db
    .insertInto("Topic")
    .values({
      name,
    })
    .executeTakeFirst();
};

const updateTopic = (db: Kysely<DB>, name: string, id: number) => {
  return db
    .updateTable("Topic")
    .set({ name })
    .where("Topic.id", "=", id)
    .executeTakeFirst();
};

const deleteTopic = (db: Kysely<DB>, name: string) => {
  return db
    .deleteFrom("Topic")
    .where("Topic.name", "=", name)
    .executeTakeFirst();
};

export const topicRepo = {
  findAllTopics,
  findTopicById,
  findTopicByName,
  createTopic,
  updateTopic,
  deleteTopic,
};
