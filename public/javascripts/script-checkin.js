import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
const socket = io("http://localhost:4003");
socket.on("connect", function () {
  console.log("connected to server");

  // socket.emit("subscribe", "example-channel");

  //Listen for messages from the "example-channel"
  socket.on("message", function (message) {
    console.log("received message:", message);
  });
  // setInterval(() => {
  //   socket.emit("hello", "world");
  // }, 1000);
});

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  // faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
]).then(startVideo);
let information;

async function startVideo() {
  // first loading data
  const labeledFaceDescriptors = await loadLabeledImages();
  async function checkForUpdates() {
    const updatedDescriptors = await loadLabeledImages();
    if (updatedDescriptors !== "DATA_NOT_UPDATED") {
      labeledFaceDescriptors = updatedDescriptors;
    }
  }
  // setInterval(checkForUpdates, 300000); // update each 5 mins

  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

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
          information._label;
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        const box = resizedDetections[0].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: res.toString(),
        });
        drawBox.draw(canvas);
      } else {
        document.getElementById("recognizedInfo").innerText = "No one";
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
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          `../labeled_images/${label}/${i}.jpg`
        );
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

async function fetchData(url) {
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

function checkin() {
  console.log(123);
}
function reset() {
  information = "";
  alert("Vui long roi khoi tam cua camera va quet lai!");
}

window.checkin = checkin
window.reset = reset