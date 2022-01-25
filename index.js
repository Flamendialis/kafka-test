const { Kafka } = require("kafkajs");

console.log("Kafka test");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "Litebox-test-group" });

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("MENSAJE :", {
        value: message.value.toString(),
        message,
        topic: topic,
        partition,
      });
    },
  });

  await producer.connect();
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "MENSAJE DE PRUEBA 4!" }],
  });

  await producer.disconnect();
})();
