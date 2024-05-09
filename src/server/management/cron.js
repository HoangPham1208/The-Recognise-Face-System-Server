const cron = require("node-cron");
const { sendAnnouncement } = require("../../helper/announcement");
const {
  get_all,
  checkFirstCheckIn,
  checkListCheckOut,
  updateCheckOut,
  updateStatusDate,
} = require("../../model/attendModel");
const { get } = require("../../routes/authRoute");

const cronExpressions = {
  morning_shift_begin: "15 7 * * 1-6",
  lunch_time_begin: "45 11 * * 1-6",
  afternoon_shift_begin: "15 13 * * 1-6",
  afternoon_shift_end: "15 16 * * 1-6",
  check_morning_end: "0 12 * * 1-6",
  check_afternoon_end: "00 17 * * 1-6",
  end_of_date: "00 18 * * 1-6",
};
function padZero(number) {
  return number < 10 ? `0${number}` : number;
}
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
    const check = await checkFirstCheckIn(formattedDate, ID, "morning shift");
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
    const check = await checkFirstCheckIn(formattedDate, ID, "afternoon shift");
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

function isInTimeRange(timeString, startTimeString, endTimeString) {
  const [hours, minutes, seconds = 0] = timeString.split(":").map(Number);
  const [startHours, startMinutes, startSeconds = 0] = startTimeString
    .split(":")
    .map(Number);
  const [endHours, endMinutes, endSeconds = 0] = endTimeString
    .split(":")
    .map(Number);

  const time = hours * 3600 + minutes * 60 + seconds;
  const startTime = startHours * 3600 + startMinutes * 60 + startSeconds;
  const endTime = endHours * 3600 + endMinutes * 60 + endSeconds;

  return time >= startTime && time <= endTime;
}
function calculateTime(timeString, endTimeString) {
  const [hours, minutes, seconds = 0] = timeString.split(":").map(Number);
  const [endHours, endMinutes, endSeconds = 0] = endTimeString
    .split(":")
    .map(Number);

  const time = hours * 3600 + minutes * 60 + seconds;
  const endTime = endHours * 3600 + endMinutes * 60 + endSeconds;

  return Math.floor((endTime - time) / 60);
}

async function check_morning_checkout() {
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
    const listCheckOut = await checkListCheckOut(formattedDate, ID); // return in desc by time
    if (listCheckOut) {
      let myListMorning = [];
      for (c in listCheckOut) {
        if (isInTimeRange(listCheckOut[c].time, "7:30:00", "12:00:00"))
          myListMorning.push(listCheckOut[c]);
      }
      // check the last type
      // 2 case: check in and check out
      // case 1: check out
      // case 2 must not happend, it depend on ...
      if ((myListMorning[0].type = "Check out")) {
        let late_time = calculateTime(myListMorning[0].time, "12:00:00");
        if (late_time > 15)
          await updateCheckOut(
            myListMorning[0].ID,
            "Soon",
            "soon for " + late_time + " minutes",
            "Last check out for morning shift"
          );
        else
          await updateCheckOut(
            myListMorning[0].ID,
            "On time",
            "Good",
            "Last check out for morning shift"
          );
      }
    }
  });
  Promise.all(listPromises)
    .then((results) => {
      console.log("Done process before morning");
    })
    .catch((error) => {
      console.error(error);
    });
}

async function check_afternoon_checkout() {
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
    const listCheckOut = await checkListCheckOut(formattedDate, ID); // return in desc by time
    if (listCheckOut) {
      let myListMorning = [];
      for (c in listCheckOut) {
        if (isInTimeRange(listCheckOut[c].time, "13:30:00", "17:00:00"))
          myListMorning.push(listCheckOut[c]);
      }
      // check the last type
      // 2 case: check in and check out
      // case 1: check out
      // case 2 must not happend, it depend on ...
      if ((myListMorning[0].type = "check out")) {
        let late_time = calculateTime(myListMorning[0].time, "17:00:00");
        if (late_time > 15)
          await updateCheckOut(
            myListMorning[0].ID,
            "Soon",
            "Soon for " + late_time + " minutes",
            "Last check out for afternoon shift"
          );
        else
          await updateCheckOut(
            myListMorning[0].ID,
            "On time",
            "Good",
            "Last check out for afternoon shift"
          );
      }
    }
  });
  Promise.all(listPromises)
    .then((results) => {
      console.log("Done process before morning");
    })
    .catch((error) => {
      console.error(error);
    });
}

async function check_end_of_date() {
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
    const first_check_in_morning = await checkFirstCheckIn(
      formattedDate,
      ID,
      "morning shift"
    );
    const first_check_in_afternoon = await checkFirstCheckIn(
      formattedDate,
      ID,
      "afternoon shift"
    );
    if (!first_check_in_morning && !first_check_in_afternoon) {
      // this mean that they're not check in working time
      // or they don't do anything in working days - data = null
      await updateStatusDate(formattedDate, "Absent", ID);
    } else {
      await updateStatusDate(formattedDate, "Completed", ID);
    }
  });
  Promise.all(listPromises)
    .then((results) => {
      console.log("Done process at the end of the date");
    })
    .catch((error) => {
      console.error(error);
    });
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
  cron.schedule(cronExpressions.check_morning_end, check_morning_checkout);
  cron.schedule(cronExpressions.check_afternoon_end, check_afternoon_checkout);
  cron.schedule(cronExpressions.end_of_date, check_end_of_date);
}
module.exports = { runCron, check_morning_checkout };
