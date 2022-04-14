/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
//creat Url to  calling Api
const basurl = "https://api.openweathermap.org/data/2.5/weather?zip=";
//personal api key 
const apikey = ",&appid=1c2bd7bd2169d2c7d5d3624c36b5dce3&units=metric";
//server for data to post it
const server = "http://127.0.0.1:3000";

// app function 
function app() {
    //add event click to button 
    document.getElementById("generate").addEventListener("click", getWeather);
    //call the api by zipcode
    async function getWeather() {
        const zip = document.getElementById("zip").value;
        const feelings = document.getElementById("feelings").value;
        try {
            const res = await fetch(basurl + zip + apikey);
            const data = await res.json();
            console.log(data)
            const { main: { temp }, name: city, weather: [{ description }] } = data;
            const info = { newDate, city, temp: Math.round(temp), description, feelings };
            postData(server + "/add", info);
            GetFullData();
            document.querySelector(".entry").style.opacity = 1;
            return data;
        } catch (error) {
            console.log("errors ", error)
        }
    }
//Post Data Function
    const postData = async (url = "", info = {}) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        });

        try {
            const Fdata = await res.json();
            console.log(Fdata);
            return Fdata;
        } catch (error) {
            console.log("ERROR", error);
        }
    };

//Function to gET and update Project Data
    const GetFullData = async () => {
        const res = await fetch(server + "/all");
        try {
            const finaldata = await res.json();

            document.getElementById("date").innerHTML = finaldata.newDate;
            document.getElementById("city").innerHTML = finaldata.city;
            document.getElementById("temp").innerHTML = finaldata.temp + '&degC';
            document.getElementById("description").innerHTML = finaldata.description;
            document.getElementById("content").innerHTML = finaldata.feelings;
        } catch (error) {
            console.log(error);
        }
    };
}

app()