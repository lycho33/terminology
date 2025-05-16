import "dotenv/config";
import db from "./db/db";
import { sql } from "kysely";

async function seed() {
  console.log("🌱 Seeding.......");

  // ------------------ DELETE --------------------------------------
  console.log("🌱 Deleting all data from Term");
  await db.deleteFrom("Term").execute();
  await sql`ALTER SEQUENCE "Term_id_seq" RESTART WITH 1`.execute(db);

  console.log("🌱 Deleting all data from Topic");
  await db.deleteFrom("Topic").execute();
  await sql`ALTER SEQUENCE "Topic_id_seq" RESTART WITH 1`.execute(db);

  // ------------------ TOPIC --------------------------------------
  console.log("🌱 Adding seed data to Topic");
  await db
    .insertInto("Topic")
    .values([
      {
        name: "RPC",
      },
    ])
    .execute();

  // ------------------ TERM ---------------------------------------

  console.log("🌱 Adding seed data to Term");
  await db
    .insertInto("Term")
    .values([
      {
        name: "gRPC",
        definition:
          "An open-source RPC initially developed by Google where a client can call any remote service method",
        usage: "microservices",
        topicId: 1,
      },
    ])
    .execute();
}

seed().catch((error) => {
  console.error("❌ Seeding failed: ", error);
  process.exit(1);
});
