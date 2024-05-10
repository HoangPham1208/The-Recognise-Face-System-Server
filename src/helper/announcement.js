const { sessions } = require("../server/iot/iotserver");

function sendAnnouncement(account_ID, message) {
  // console.log(sessions.hasOwnProperty(account_ID));
  if (sessions[account_ID]) {
    if (sessions[account_ID].isConnected) sessions[account_ID].push(message);
    else delete sessions[account_ID];
  }
}

module.exports = { sendAnnouncement };
