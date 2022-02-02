const kafka = require("./kafka");

(async () => {
  const producer = kafka.producer();

  try {
    await producer.connect();
    await producer.send({
      topic: "test-raw-data",
      messages: [
        {
          value: JSON.stringify({
            name: "NUEVO MENSAJE DE PRUEBA 100",
            time: new Date().getMilliseconds(),
          }),
        },
        {
          value: JSON.stringify({
            name: "NUEVO MENSAJE DE PRUEBA 200",
            time: new Date().getMilliseconds(),
          }),
        },
      ],
    });
    await producer.disconnect();
  } catch (e) {
    console.log(e);
  }
})();
