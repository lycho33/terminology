"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = __importDefault(require("./db/db"));
const kysely_1 = require("kysely");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🌱 Seeding.......");
        // ------------------ DELETE --------------------------------------
        console.log("🌱 Deleting all data from Term");
        yield db_1.default.deleteFrom("Term").execute();
        yield (0, kysely_1.sql) `ALTER SEQUENCE "Term_id_seq" RESTART WITH 1`.execute(db_1.default);
        console.log("🌱 Deleting all data from Topic");
        yield db_1.default.deleteFrom("Topic").execute();
        yield (0, kysely_1.sql) `ALTER SEQUENCE "Topic_id_seq" RESTART WITH 1`.execute(db_1.default);
        // ------------------ TOPIC --------------------------------------
        console.log("🌱 Adding seed data to Topic");
        yield db_1.default
            .insertInto("Topic")
            .values([
            {
                name: "RPC",
            },
        ])
            .execute();
        // ------------------ TERM ---------------------------------------
        console.log("🌱 Adding seed data to Term");
        yield db_1.default
            .insertInto("Term")
            .values([
            {
                name: "gRPC",
                definition: "An open-source RPC initially developed by Google where a client can call any remote service method",
                usage: "microservices",
                topicId: 1,
            },
        ])
            .execute();
    });
}
seed().catch((error) => {
    console.error("❌ Seeding failed: ", error);
    process.exit(1);
});
