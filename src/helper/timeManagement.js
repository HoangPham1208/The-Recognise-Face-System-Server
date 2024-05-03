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
      return "morning_shift";
    else return "morning_before";
  } else if (begin_morning_hours <= hour && hour <= end_morning_hours) {
    if (hour == end_morning_hours && minutes > end_morning_minutes)
      return "lunch_time";
    else return "morning_shift";
  } else if (begin_lunch_hours <= hour && hour <= end_lunch_hours) {
    if (hour == end_lunch_hours && minutes > end_lunch_minutes)
      return "afternoon_shift";
    else return "lunch_time";
  } else if (begin_afternoon_hours <= hour && hour <= end_afternoon_hours) {
    if (hour == end_afternoon_hours && minutes > end_afternoon_minutes)
      return "afternoon_after";
    else return "afternoon_shift";
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
  if (check_type == "check_in") {
    if (value_shift == "morning_before") {
      const check = await check_in_func(formattedDate, account_ID, value_shift);
      if (check) {
        value = "go in";
        type = "check in";
      } else {
        value = "good";
        type = "first check in for morning_shift";
      }
    } else if (value_shift == "morning_shift") {
      const check = await check_in_func(formattedDate, account_ID, value_shift);
      if (check) {
        value = "go in";
        type = "check in";
      } else {
        const check = checkFirstCheckIn(date, value_shift);
        value = check.value;
        type = check.type;
      }
    } else if (value_shift == "lunch_time") {
      value = "go in";
      type = "check in";
    } else if (value_shift == "afternoon_shift") {
      const check = await check_in_func(formattedDate, account_ID, value_shift);
      if (check) {
        value = "go in";
        type = "check in";
      } else {
        const check = checkFirstCheckIn(date, value_shift);
        value = check.value;
        type = check.type;
      }
    } else {
      value = "go in";
      type = "out of work";
    }
  }
  if (check_type == "check_out") {
    // Process data again after time
    value = "go out";
    type = "check out";
  }
  return { formattedDate, formattedTime, value, type };
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}
function checkFirstCheckIn(date, value_shift) {
  const [arrival_hours, arrival_minutes] = [date.getHours(), date.getMinutes()];
  if (value_shift == "morning_shift") {
    const arrival_in_minutes = arrival_hours * 60 + arrival_minutes;
    const begin_in_minutes = begin_morning_hours * 60 + begin_morning_minutes;
    value = "late for " + (arrival_in_minutes - begin_in_minutes) + " minutes";
  } else if (value_shift == "afternoon_shift") {
    const arrival_in_minutes = arrival_hours * 60 + arrival_minutes;
    const begin_in_minutes =
      begin_afternoon_hours * 60 + begin_afternoon_minutes;
    if (arrival_in_minutes - begin_in_minutes > penalty)
      value =
        "late for " + (arrival_in_minutes - begin_in_minutes) + " minutes";
    else value = "good";
  }
  type = "first check in for " + value_shift;
  return { value, type };
}

module.exports = process;
