const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("app started on PORT ", PORT));
