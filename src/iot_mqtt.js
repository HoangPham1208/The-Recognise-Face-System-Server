const mqtt = require("mqtt");
const { SerialPort } = require("serialport");

async function getPort() {
  try {
    const ports = await SerialPort.list();
    const N = ports.length;
    let commPort;
    for (let i = 0; i < N; i++) {
      const port = ports[i];
      if (port.manufacturer === "USB Serial Device") {
        commPort = port.path;
        break;
      }
    }
    console.log("Found port:", commPort); // Add this line for debugging
    return "COM3";
  } catch (error) {
    console.error("Error getting port:", error);
    throw error;
  }
}
async function setup() {
  try {
    const portPath = await getPort();
    const microPort = new SerialPort({ path: portPath, baudRate: 115200 });
    microPort.on("open", function () {
      // open logic
      console.log("Microbit's port is connected");
    });
    microPort.on("data", function (data) {
      console.log("Data:", data);
    });
    microPort.on("error", (err) => {
      console.error("Error reading serial port:", err);
    });

    const mqtt_client = mqtt.connect({
      host: process.env.MQTT_broker,
      port: process.env.MQTT_port,
      username: process.env.MQTT_user,
      password: process.env.MQTT_password,
    });
    let topics = [process.env.topic_cambien_1, process.env.topic_cambien_2];
    // Check connection
    mqtt_client.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqtt_client.subscribe(topics, (err) => {
        if (err) {
          console.error("Error subscribing to topic:", err);
        } else {
          console.log("Subscribed successfully");
          mqtt_client.publish(topics, "MQTT worked");
        }
      });
    });

    mqtt_client.on("message", (topic, message) => {
      console.log("Received message on topic", topic, ":", message.toString());
    });
  } catch (error) {
    console.error("Error setting up:", error);
  }
}

module.exports = { setup };
