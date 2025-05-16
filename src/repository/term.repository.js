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
exports.termRepo = void 0;
const findAllTerms = (db) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db.selectFrom("Term").selectAll().execute();
});
const findTermById = (db, id) => {
    return db
        .selectFrom("Term")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();
};
const findTermByName = (db, name) => {
    return db
        .selectFrom("Term")
        .selectAll()
        .where("Term.name", "=", name)
        .executeTakeFirst();
};
const createTerm = (db, body) => {
    return db
        .insertInto("Term")
        .values(Object.assign({}, body))
        .executeTakeFirst();
};
const updateTerm = (db, body, id) => {
    return db
        .updateTable("Term")
        .set(Object.assign({}, body))
        .where("Term.id", "=", id)
        .executeTakeFirst();
};
const deleteTerm = (db, name) => {
    return db.deleteFrom("Term").where("Term.name", "=", name).executeTakeFirst();
};
exports.termRepo = {
    findAllTerms,
    findTermById,
    findTermByName,
    createTerm,
    updateTerm,
    deleteTerm,
};
