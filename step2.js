const fs = require("fs");
const process = require("process");
const axios = require("axios");
function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      // handle possible error
      console.error(err);
      // kill the process and tell the shell it errored
      process.exit(1);
    }

    console.log(data);
  });
}

async function webCat(url) {
  try {
    let res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.log("ERROR", e);
    process.exit(1);
  }
}

if (process.argv[2].startsWith("http")) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
