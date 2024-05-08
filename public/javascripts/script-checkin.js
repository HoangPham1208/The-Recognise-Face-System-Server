// import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
// const socket = io("http://localhost:4003");
// socket.on("connect", function () {
//   console.log("connected to server");

//   // socket.emit("subscribe", "example-channel");

//   //Listen for messages from the "example-channel"
//   socket.on("message", function (message) {
//     console.log("received message:", message);
//   });
//   // setInterval(() => {
//   //   socket.emit("hello", "world");
//   // }, 1000);
// });

var data_user;
var real_data;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  // faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  (data_user = await fetch("http://localhost:4002/attend/getAll")),
  (real_data = await data_user.json()),
]).then(startVideo);
let information;

async function startVideo() {
  const user = real_data.message;
  let data_dict = {};
  user.forEach((item) => {
    let item_id = item.ID;
    data_dict[item_id] = item;
  });
  // first loading data
  const labeledFaceDescriptors = await loadLabeledImages();
  async function checkForUpdates() {
    const updatedDescriptors = await loadLabeledImages();
    if (updatedDescriptors !== "DATA_NOT_UPDATED") {
      labeledFaceDescriptors = updatedDescriptors;
    }
  }
  // setInterval(checkForUpdates, 300000); // update each 5 mins

  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5);

  video.addEventListener("play", () => {
    const canvas = faceapi.createCanvasFromMedia(video); // got canvas
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors(); // withFaceExpressions
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      if (resizedDetections.length != 0) {
        const res = faceMatcher.findBestMatch(resizedDetections[0].descriptor);
        information = res;
        document.getElementById("recognizedInfo").innerText =
          "ID staff = " +
          information._label +
          " - Name: " +
          data_dict[information._label].name;
      } else {
        document.getElementById("recognizedInfo").innerText = "No one";
        information = null;
      }
      // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
  });

  navigator.getUserMedia(
    { video: {} },
    (stream) => {
      video.srcObject = stream;
      console.log("Camera is working. Hello!");
    },
    (err) => console.error(err)
  );
}

var useLabels = null;
async function loadLabeledImages() {
  let labelsData = await fetchData("http://localhost:4002/labeled");
  useLabels == labelsData;
  const labels = labelsData.name_list;
  const labeledFaceDescriptors = await Promise.all(
    labels.map(async (label) => {
      let data = await fetchData(
        `http://localhost:4002/attend/getModelList/${label}`
      );
      let list = data.message;
      console.log(list);
      const descriptions = [];
      for (let i = 0; i < list.length; i++) {
        const img = await faceapi.fetchImage(`../${list[i]}`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
  return labeledFaceDescriptors;
}

async function fetchData(url, patch) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}
function postData(url) {
  if (!information) return "No one to check in";

  const postData = {
    account_ID: information._label,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON from the response
    })
    .then((data) => {
      console.log("Data successfully posted:", data);
    })
    .catch((error) => {
      console.error("There was a problem posting the data:", error);
    });
}

function fetchTempAndHumi() {
  fetch("https://io.adafruit.com/api/v2/QuangBang/feeds/cambien1")
    .then((response) => response.json())
    .then((data) => {
      // Assuming the API returns data in the format { temperature: 25, humidity: 60 }
      document.getElementById("temp").textContent = data.last_value;
      document.getElementById("temp_time").textContent =  data.updated_at.split('T')[1].split('Z')[0] + "   " + data.updated_at.split('T')[0];
    })
    .catch((error) => console.error("Error fetching data:", error));
  fetch("https://io.adafruit.com/api/v2/QuangBang/feeds/cambien3")
    .then((response) => response.json())
    .then((data) => {
      // Assuming the API returns data in the format { temperature: 25, humidity: 60 }
      document.getElementById("humi").textContent = data.last_value;
      document.getElementById("humi_time").textContent = data.updated_at.split('T')[1].split('Z')[0] + "   " + data.updated_at.split('T')[0];
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Call fetchDataAndUpdate initially
fetchTempAndHumi()

// Call fetchDataAndUpdate every 5 seconds
setInterval(fetchTempAndHumi, 5000);

function checkin() {
  const url = "http://localhost:4002/attend/check-in";
  postData(url);
}
function reset() {
  information = "";
  alert("Vui long roi khoi tam cua camera va quet lai!");
}

window.checkin = checkin;
window.reset = reset;
