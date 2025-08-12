const fastify = require("fastify")({
  logger: true,
});
const { existsSync, readFileSync } = require("fs-extra");
const index = require("./index.js");

const delay = parseInt(process.env.TOTAL_DELAY_SECONDS);
let delayTime = 43200;
if (delay) {
  delayTime = delay;
}
console.log(`Delay set to ${delayTime}s`);
delayTime = delayTime * 1000;
const interval = setInterval(index.main, delayTime);

fastify.get("/playlist.m3u8", (req, res) => {
  if (existsSync("playlist.m3u8")) {
    const content = readFileSync("playlist.m3u8");
    res.header("content-type", "application/m3u");
    return res.send(content);
  }
  return res.send();
});

fastify.get("/guide.xml", (req, res) => {
  if (existsSync("epg.xml")) {
    const content = readFileSync("epg.xml");
    res.header("content-type", "application/xml");
    return res.send(content);
  }
  return res.send();
});

fastify.listen({ port: 3000 }, (err, addr) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${addr}`);
});
