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
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicRepo = void 0;
const findAllTopics = (db) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db.selectFrom("Topic").selectAll().execute();
});
const findTopicById = (db, id) => {
    return db
        .selectFrom("Topic")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();
};
const findTopicByName = (db, name) => {
    return db
        .selectFrom("Topic")
        .selectAll()
        .where("Topic.name", "=", name)
        .executeTakeFirst();
};
const createTopic = (db, name) => {
    return db
        .insertInto("Topic")
        .values({
        name,
    })
        .executeTakeFirst();
};
const updateTopic = (db, name, id) => {
    return db
        .updateTable("Topic")
        .set({ name })
        .where("Topic.id", "=", id)
        .executeTakeFirst();
};
const deleteTopic = (db, name) => {
    return db
        .deleteFrom("Topic")
        .where("Topic.name", "=", name)
        .executeTakeFirst();
};
exports.topicRepo = {
    findAllTopics,
    findTopicById,
    findTopicByName,
    createTopic,
    updateTopic,
    deleteTopic,
};
