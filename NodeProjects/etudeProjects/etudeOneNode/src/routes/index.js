const express = require("express");
const router = express.Router();

router.post("/", (res, req) => {
  res.send("index");
});

router.post("/about", (res, req) => {
  res.send("about");
});
console.log(router);
module.exports = router;
