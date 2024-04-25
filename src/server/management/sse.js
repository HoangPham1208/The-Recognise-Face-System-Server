const { createSession } = require("better-sse");

const session = await createSession(req,res)

function sseSetup(app) {
  app.get("/sse", async (req, res) => {
    const session = await createSession(req, res);

    session.push("Hello world!");
  });
}

function test(){
  session.push("huhu")
}

module.exports = {test, sseSetup}
