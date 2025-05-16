import { Kysely } from "kysely";
import { DB } from "../types/types";

const findAllTerms = async (db: Kysely<DB>) => {
  return await db.selectFrom("Term").selectAll().execute();
};

const findTermById = (db: Kysely<DB>, id: number) => {
  return db
    .selectFrom("Term")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
};

const findTermByName = (db: Kysely<DB>, name: string) => {
  return db
    .selectFrom("Term")
    .selectAll()
    .where("Term.name", "=", name)
    .executeTakeFirst();
};

interface TermBody {
  name: string;
  definition: string;
  topicId: number;
  usage?: string;
  example?: JSON;
}

const createTerm = (db: Kysely<DB>, body: TermBody) => {
  return db
    .insertInto("Term")
    .values({ ...body })
    .executeTakeFirst();
};

const updateTerm = (db: Kysely<DB>, body: TermBody, id: number) => {
  return db
    .updateTable("Term")
    .set({ ...body })
    .where("Term.id", "=", id)
    .executeTakeFirst();
};

const deleteTerm = (db: Kysely<DB>, name: string) => {
  return db.deleteFrom("Term").where("Term.name", "=", name).executeTakeFirst();
};

export const termRepo = {
  findAllTerms,
  findTermById,
  findTermByName,
  createTerm,
  updateTerm,
  deleteTerm,
};
