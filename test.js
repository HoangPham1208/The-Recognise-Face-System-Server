async function firstTask() {
  // Simulate some asynchronous operation
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("First task completed");
  return 1;
}

async function secondTask() {
  // Simulate some asynchronous operation
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Second task completed");
  return 2;
}

async function executeTasksSequentially() {
  console.log("Starting tasks...");
  const a = await firstTask();
  var b = a
  if (b == 1) {
    t = await secondTask();
    console.log(t);
  }
  console.log("All tasks completed");
}

executeTasksSequentially();
