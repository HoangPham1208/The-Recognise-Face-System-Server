const {session} = require("../server/management/server")

function sendAnnouncement(account_ID, message) {
    session[account_ID].push(message)
}