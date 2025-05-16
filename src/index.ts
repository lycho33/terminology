import db from "./db/db";
import { termRepo } from "./repository/term.repository";
import { topicRepo } from "./repository/topic.repository";

const main = async () => {
  const topics = await topicRepo.findAllTopics(db);
  const topic = await topicRepo.findTopicById(db, 1);
  const newTopic = await topicRepo.createTopic(db, "Auth");
  const newTopicId = await topicRepo.findTopicByName(db, "Auth");
  console.log("All Topics: ", topics);
  console.log("Topic: ", topic);
  console.log("New Topic: ", newTopic, newTopicId);

  if (newTopicId) {
    const updatedTopic = await topicRepo.updateTopic(
      db,
      "Authentication",
      newTopicId?.id
    );
    console.log("Updated Topic: ", updatedTopic);
  }
  await topicRepo.deleteTopic(db, "Authentication");

  const terms = await termRepo.findAllTerms(db);
  const term = await termRepo.findTermById(db, 1);
  const body = {
    name: "REST API",
    definition:
      "Follows a HTTP protocol to send requests and responses between the client and server",
    topicId: 1,
  };
  const newTerm = await termRepo.createTerm(db, body);
  const newTermId = await termRepo.findTermByName(db, "REST API");
  console.log("All Terms: ", terms);
  console.log("Term: ", term);
  console.log("New Term: ", newTerm, newTermId);

  if (newTermId) {
    const updatedTerm = await termRepo.updateTerm(
      db,
      {
        ...body,
        definition:
          "a simple, uniform interface that is used to make data and other resources available through HTTP",
      },
      newTermId.id
    );
    console.log("Updated Term: ", updatedTerm);
  }
  await termRepo.deleteTerm(db, "REST API");
};

main();
