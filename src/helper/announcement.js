const { session } = require("../server/iot/iotserver");

function sendAnnouncement(account_ID, message) {
  if (session[account_ID]) {
    if (session[account_ID].isConnected) session[account_ID].push(message);
    else delete session[account_ID];
  }
}

module.exports = { sendAnnouncement };
