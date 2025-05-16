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
const db_1 = __importDefault(require("./db/db"));
const term_repository_1 = require("./repository/term.repository");
const topic_repository_1 = require("./repository/topic.repository");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_repository_1.topicRepo.findAllTopics(db_1.default);
    const topic = yield topic_repository_1.topicRepo.findTopicById(db_1.default, 1);
    const newTopic = yield topic_repository_1.topicRepo.createTopic(db_1.default, "Auth");
    const newTopicId = yield topic_repository_1.topicRepo.findTopicByName(db_1.default, "Auth");
    console.log("All Topics: ", topics);
    console.log("Topic: ", topic);
    console.log("New Topic: ", newTopic, newTopicId);
    if (newTopicId) {
        const updatedTopic = yield topic_repository_1.topicRepo.updateTopic(db_1.default, "Authentication", newTopicId === null || newTopicId === void 0 ? void 0 : newTopicId.id);
        console.log("Updated Topic: ", updatedTopic);
    }
    yield topic_repository_1.topicRepo.deleteTopic(db_1.default, "Authentication");
    const terms = yield term_repository_1.termRepo.findAllTerms(db_1.default);
    const term = yield term_repository_1.termRepo.findTermById(db_1.default, 1);
    const body = {
        name: "REST API",
        definition: "Follows a HTTP protocol to send requests and responses between the client and server",
        topicId: 1,
    };
    const newTerm = yield term_repository_1.termRepo.createTerm(db_1.default, body);
    const newTermId = yield term_repository_1.termRepo.findTermByName(db_1.default, "REST API");
    console.log("All Terms: ", terms);
    console.log("Term: ", term);
    console.log("New Term: ", newTerm, newTermId);
    if (newTermId) {
        const updatedTerm = yield term_repository_1.termRepo.updateTerm(db_1.default, Object.assign(Object.assign({}, body), { definition: "a simple, uniform interface that is used to make data and other resources available through HTTP" }), newTermId.id);
        console.log("Updated Term: ", updatedTerm);
    }
    yield term_repository_1.termRepo.deleteTerm(db_1.default, "REST API");
});
main();
