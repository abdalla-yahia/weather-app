// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
app.use(express.json())
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 3000;
const hostname = "127.0.0.1";
app.listen(port, () => {
    console.log(`server running at http://${hostname}:${port} ....`)
});

//Get data
app.get("/all", (req, res) => {
    res.send(projectData)
});
//post data
app.post("/add", (req,res)=> {
    projectData = req.body;
    res.send(projectData)
})