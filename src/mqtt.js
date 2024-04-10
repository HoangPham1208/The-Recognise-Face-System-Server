const mqtt = require("mqtt");

const mqtt_client = mqtt.connect({
  host: "www.example.com",
  port: 1883,
  username: "username",
  password: "password",
});
client.on("connect", () => {
  client.subscribe("presence", (err) => {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

mqtt_client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});

module.exports = mqtt_client