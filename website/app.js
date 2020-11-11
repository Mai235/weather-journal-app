
/* Global Variables */



// Personal API Key from OpenWeatherMap API
const baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '0fe58fe524734cd4295895b0b140b288';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
 
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  

  // get user input values
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  
/* Function to GET data */

getWeather(baseURL, newZip, apiKey)
    .then(function (userData) {

      //console.log userData
      console.log(userData);

      // add data to POST request
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    }).then(function (_newData) {

      // call updateUI to update browser content
      updateUI()

    });
  
  }

/* Function to GET Web API Data*/
// async using arrow function

const getWeather = async (baseURL, newZip, apiKey) => {

  // res equals to the result of fetch function
  const res = await fetch(baseURL + newZip + apiKey);
  try {

    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  }catch (error) {
    console.log("error", error);
  }
}


/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  });

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};

//update UI Demo


const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;

  }catch(error){
    console.log("error", error);
  }
}

