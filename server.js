//Empty JS object to act as endpoint for all routes 
projectData = {};


// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 8000;

/* Spin up the server*/
const server = app.listen(port, listening);
 
//callback to debug
function listening(){

    console.log('server running');
    console.log(`running on localhost: ${port}`);
  };
// Callback function to GET all 
app.get('/all', getInfo);


// GET route returns projectData

function getInfo(request, response) {
  res.send(projectData);
}

app.get('/all', function (request, response) {
  response.send(projectData);
});

// Post Route
const data = [];
app.post('/add', addInfo);

function addInfo(request, response) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}



// POST route adds data to ProjectData
app.post('/add', function (request, response) {
  console.log(request.body);
  newEntry = {
      temperature: request.body.temperature,
      date: request.body.date,
      userResponse: request.body.userResponse
  };
  projectData.push(newEntry);
});




