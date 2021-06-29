const fs = require("fs");
const process = require("process");
const axios = require("axios");

function readOrWrite(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf8", function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}
function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      // handle possible error
      console.error(err);
      // kill the process and tell the shell it errored
      process.exit(1);
    } else {
      readOrWrite(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    let res = await axios.get(url);
    readOrWrite(res.data, out);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
let path;
let out;

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}
if (path.startsWith("http")) {
  webCat(path, out);
} else {
  cat(path, out);
}
