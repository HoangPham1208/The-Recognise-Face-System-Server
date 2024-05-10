const { sessions } = require("../server/iot/iotserver");

function sendAnnouncement(account_ID, message) {
  if (sessions[account_ID]) {
    const data = `data: ${JSON.stringify(message)}\n\n`;
    // if (session[account_ID].isConnected)
    sessions[account_ID].write(data);
    // else delete session[account_ID];
  }
}

module.exports = { sendAnnouncement };
