const mqtt = require("mqtt");
const { SerialPort } = require("serialport");
let receivedData = Buffer.alloc(0);
let microPort = null;
let openFlag = false;

function processData() {
  if (receivedData.length > 0) {
    const completeMessage = receivedData.toString("utf8"); // Convert the complete message buffer to a readable string
    let ts = new Date();
    console.log("Data:", completeMessage);
    console.log("At: ", ts);
    receivedData = Buffer.alloc(0); // Reset receivedData after processing
  }
  // else {
  //   console.log("No data received within 1 second.");
  // }
}

async function getPort() {
  try {
    const ports = await SerialPort.list();
    const N = ports.length;
    let commPort;
    for (let i = 0; i < N; i++) {
      const port = ports[i];
      if (port.friendlyName.includes("USB Serial Device")) {
        commPort = port.path;
        break;
      }
    }
    console.log("Found port:", commPort); // Add this line for debugging
    return commPort;
  } catch (error) {
    console.error("Error getting port:", error);
    throw error;
  }
}
async function setup() {
  try {
    const portPath = await getPort();
    microPort = new SerialPort({ path: portPath, baudRate: 115200 });
    microPort.on("open", function () {
      // open logic
      console.log("Microbit's port is connected");
    });
    microPort.on("data", function (chunk) {
      receivedData = Buffer.concat([receivedData, chunk]);
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
    setInterval(processData, 1000); // CHECK DATA Received FROM MICRO:BIT
  } catch (error) {
    console.error("Error setting up:", error);
    console.error("No connected to IoT Device");
  }
}

const pattern = /!4:IR:([0|1])#*/;
// const match = pattern.exec("!4:IR:1#");
// match[1] == 1
function Door() {
  try {
    if (microPort) {
      let match = pattern.exec(receivedData.toString("utf8"));
      if (!match) {
        value = +match[1];
        if (openFlag && value == 1) {
          microPort.write("1");
        } else {
          microPort.write("0");
          openFlag = false;
        }
      }
    } else {
      console.error("MicroPort is not initialized. Call setup() first.");
    }
  } catch (error) {
    console.error("Error writing data to micro:bit:", error);
  }
}

// setInterval(Door, 3000);

function changeFlag() {
  openFlag = true;
}

function checkFlag() {
  console.log(openFlag);
}
// setInterval(checkFlag, 1000);

module.exports = { changeFlag, setup };
