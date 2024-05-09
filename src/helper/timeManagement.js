const { stat } = require("fs");
const shifts = require("../config/dbconfig.json");
const penalty = shifts["penalty"];

const [begin_morning, end_morning] = [
  shifts["morning_shift"].begin_time,
  shifts["morning_shift"].end_time,
];
const [begin_morning_hours, begin_morning_minutes] = begin_morning
  .split(":")
  .map(Number);
const [end_morning_hours, end_morning_minutes] = end_morning
  .split(":")
  .map(Number);
const valid_check_in_begin = shifts["morning_shift"].valid_check_in_begin;
const [valid_check_in_begin_hours, valid_check_in_begin_minutes] =
  valid_check_in_begin.split(":").map(Number);

const [begin_lunch, end_lunch] = [
  shifts["lunch_time"].begin_time,
  shifts["lunch_time"].end_time,
];
const [begin_lunch_hours, begin_lunch_minutes] = begin_lunch
  .split(":")
  .map(Number);
const [end_lunch_hours, end_lunch_minutes] = end_lunch.split(":").map(Number);

const [begin_afternoon, end_afternoon] = [
  shifts["afternoon_shift"].begin_time,
  shifts["afternoon_shift"].end_time,
];
const [begin_afternoon_hours, begin_afternoon_minutes] = begin_afternoon
  .split(":")
  .map(Number);
const [end_afternoon_hours, end_afternoon_minutes] = end_afternoon
  .split(":")
  .map(Number);
function getShift(date) {
  var hour = date.getHours();
  var minutes = date.getMinutes();
  if (valid_check_in_begin_hours <= hour && hour <= begin_morning_hours) {
    if (hour == begin_morning_hours && minutes > begin_morning_minutes)
      return "morning shift";
    else return "morning before";
  } else if (begin_morning_hours <= hour && hour <= end_morning_hours) {
    if (hour == end_morning_hours && minutes > end_morning_minutes)
      return "lunch time";
    else return "morning shift";
  } else if (begin_lunch_hours <= hour && hour <= end_lunch_hours) {
    if (hour == end_lunch_hours && minutes > end_lunch_minutes)
      return "afternoon shift";
    else return "lunch time";
  } else if (begin_afternoon_hours <= hour && hour <= end_afternoon_hours) {
    if (hour == end_afternoon_hours && minutes > end_afternoon_minutes)
      return "afternoon after";
    else return "afternoon shift";
  } else return "out of time";
}
async function process(check_type, account_ID, check_in_func) {
  var date = new Date();
  // Formatting date
  const formattedDate = `${date.getFullYear()}-${padZero(
    date.getMonth() + 1
  )}-${padZero(date.getDate())}`;
  // Formatting time
  const formattedTime = `${padZero(date.getHours())}:${padZero(
    date.getMinutes()
  )}:${padZero(date.getSeconds())}`;
  var value;
  var type = "";
  const value_shift = getShift(date);
  let status_ = "Normal"
  if (check_type == "Check_in") {
    if (value_shift == "morning before") {
      const check = await check_in_func(formattedDate, account_ID, value_shift);
      if (check) {
        value = "Go in";
        type = "Check in";
      } else {
        value = "Good";
        type = "First check in for morning shift";
        status_ = "On time"
      }
    } else if (value_shift == "morning shift") {
      const check = await check_in_func(formattedDate, account_ID, value_shift);
      if (check) {
        value = "Go in";
        type = "Check in";
      } else {
        const check = checkFirstCheckIn(date, value_shift);
        value = check.value;
        type = check.type;
        status_ = check.status_
      }
    } else if (value_shift == "lunch time") {
      value = "Go in";
      type = "Check in";
    } else if (value_shift == "afternoon shift") {
      const check = await check_in_func(formattedDate, account_ID, value_shift);
      if (check) {
        value = "Go in";
        type = "Check in";
      } else {
        const check = checkFirstCheckIn(date, value_shift);
        value = check.value;
        type = check.type;
        status_ = check.status_
      }
    } else {
      value = "Go in";
      type = "Out of work";
    }
  }
  if (check_type == "Check out") {
    // Process data again after time
    value = "Go out";
    type = "Check out";
  }
  return { formattedDate, formattedTime, status_, value, type };
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}
function checkFirstCheckIn(date, value_shift) {
  const [arrival_hours, arrival_minutes] = [date.getHours(), date.getMinutes()];
  if (value_shift == "morning shift") {
    const arrival_in_minutes = arrival_hours * 60 + arrival_minutes;
    const begin_in_minutes = begin_morning_hours * 60 + begin_morning_minutes;
    value = "Late for " + (arrival_in_minutes - begin_in_minutes) + " minutes";
    status_ = "Late";
  } else if (value_shift == "afternoon shift") {
    const arrival_in_minutes = arrival_hours * 60 + arrival_minutes;
    const begin_in_minutes =
      begin_afternoon_hours * 60 + begin_afternoon_minutes;
    if (arrival_in_minutes - begin_in_minutes > penalty) {
      value =
        "Late for " + (arrival_in_minutes - begin_in_minutes) + " minutes";
      status_ = "Late";
    } else {
      value = "Good";
      status_ = "Normal";
    }
  }
  type = "First check in for " + value_shift;

  return { status_, value, type };
}

module.exports = process;
