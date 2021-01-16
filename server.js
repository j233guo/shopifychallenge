const express = require("express");
const app = express();
const path = require("path");

const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(HTTP_PORT);

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});