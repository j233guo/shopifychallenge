const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
    destination: "./public/photos/",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/upload.html"));
}); 

app.post("/", upload.single("photo"), (req, res) => {
    const formFile = req.file;
    const dataReceived = "Your submission was received:<br/>" + "This is the image you sent:<br/><img src='/photos/" + formFile.filename + "'/>";
    res.send(dataReceived);
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(HTTP_PORT, ()=>{
    console.log("listening on: " + HTTP_PORT);
});