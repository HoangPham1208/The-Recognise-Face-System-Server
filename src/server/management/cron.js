const cron = require("node-cron");
const { sendAnnouncement } = require("../../helper/announcement");
const { get_all, checkFirstCheckIn } = require("../../model/attendModel");
const cronExpressions = {
  morning_shift_begin: "15 7 * * 1-6",
  lunch_time_begin: "45 11 * * 1-6",
  afternoon_shift_begin: "15 13 * * 1-6",
  afternoon_shift_end: "15 16 * * 1-6",
};

async function notification_before_morning() {
  var date = new Date();
  const formattedDate = `${date.getFullYear()}-${padZero(
    date.getMonth() + 1
  )}-${padZero(date.getDate())}`;
  const formattedTime = `${padZero(date.getHours())}:${padZero(
    date.getMinutes()
  )}:${padZero(date.getSeconds())}`;
  const getAll = await get_all();
  const allOfIds = getAll.map((obj) => obj.ID);
  const listPromises = allOfIds.map(async (ID) => {
    const check = await checkFirstCheckIn(formattedDate, ID, "morning_shift");
    if (!check) {
      const message = "You have 15 mins left to check in at morning";
      sendAnnouncement(ID, message);
    }
  });
  Promise.all(listPromises)
    .then((results) => {
      console.log("Done process before morning");
    })
    .catch((error) => {
      console.error(error);
    });
  // SSE do, no need to add notification
}

async function notification_before_lunch() {
  var date = new Date();
  const formattedDate = `${date.getFullYear()}-${padZero(
    date.getMonth() + 1
  )}-${padZero(date.getDate())}`;
  const formattedTime = `${padZero(date.getHours())}:${padZero(
    date.getMinutes()
  )}:${padZero(date.getSeconds())}`;
  const getAll = await get_all();
  const allOfIds = getAll.map((obj) => obj.ID);
  const listPromises = allOfIds.map(async (ID) => {
    const message = "15 mins left to lunch time";
    sendAnnouncement(ID, message);
  });
  Promise.all(listPromises)
    .then((results) => {
      console.log("Done process before morning");
    })
    .catch((error) => {
      console.error(error);
    });
  // SSE do, no need to add notification
}

async function notification_before_afternoon() {
  var date = new Date();
  const formattedDate = `${date.getFullYear()}-${padZero(
    date.getMonth() + 1
  )}-${padZero(date.getDate())}`;
  const formattedTime = `${padZero(date.getHours())}:${padZero(
    date.getMinutes()
  )}:${padZero(date.getSeconds())}`;
  const getAll = await get_all();
  const allOfIds = getAll.map((obj) => obj.ID);
  const listPromises = allOfIds.map(async (ID) => {
    const check = await checkFirstCheckIn(formattedDate, ID, "afternoon_shift");
    if (!check) {
      const message = "You have 15 mins left to check in at afternoon";
      sendAnnouncement(ID, message);
    }
  });
  Promise.all(listPromises)
    .then((results) => {
      console.log("Done process before morning");
    })
    .catch((error) => {
      console.error(error);
    });
  // SSE do, no need to add notification
}

async function notification_check_out() {
  var date = new Date();
  const formattedDate = `${date.getFullYear()}-${padZero(
    date.getMonth() + 1
  )}-${padZero(date.getDate())}`;
  const formattedTime = `${padZero(date.getHours())}:${padZero(
    date.getMinutes()
  )}:${padZero(date.getSeconds())}`;
  const getAll = await get_all();
  const allOfIds = getAll.map((obj) => obj.ID);
  const listPromises = allOfIds.map(async (ID) => {
    const message = "15 mins left to go home";
    sendAnnouncement(ID, message);
  });
  Promise.all(listPromises)
    .then((results) => {
      console.log("Done process before morning");
    })
    .catch((error) => {
      console.error(error);
    });
  // SSE do, no need to add notification
}

// Schedule the job to run every minute
function runCron() {
  cron.schedule(
    cronExpressions.morning_shift_begin,
    notification_before_morning
  );
  cron.schedule(cronExpressions.lunch_time_begin, notification_before_lunch);
  cron.schedule(
    cronExpressions.afternoon_shift_begin,
    notification_before_afternoon
  );
  cron.schedule(cronExpressions.afternoon_shift_end, notification_check_out);
}
module.exports = { runCron };
