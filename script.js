var inputFormEl = document.querySelector(".form-input");
var APIKey = "a8fe8e270b30883ded902415fd9d7831";
var temp;
var wind;
var humidity;
var time;
var cityName;
var previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
var weatherIcon;

function handleFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector("#search-input").value;
    var searchInputValTrimmed = searchInputVal.trim();

    if (searchInputValTrimmed) {

        if (!previousSearches.includes(searchInputValTrimmed)) {
            previousSearches.push(searchInputValTrimmed);
            localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
            createSearchButton(searchInputValTrimmed);
        }

        getWeather(searchInputValTrimmed);
        inputFormEl.reset();
    } else {
        alert("Please enter a city name");
    }
}

function createSearchButton(city) {
    var button = document.createElement("button");
    button.textContent = city;
    button.classList.add("btn");
    button.addEventListener("click", function () {
        getWeather(city);
    });
    document.getElementById("previousSearches").appendChild(button);
}

function loadPreviousSearches() {
    previousSearches.forEach(function (city) {
        createSearchButton(city);
    });
}

function getWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=a8fe8e270b30883ded902415fd9d7831";

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    temp = data.main.temp;
                    wind = data.wind.speed;
                    humidity = data.main.humidity;
                    cityName = data.name;
                    weatherIcon = data.weather[0].icon;
                    //time = parseInt(data.dt);
                    console.log(data);
                    displayWeather(data);
                    getForecast(data.coord.lat, data.coord.lon);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        });
}


function getForecast(lat, lon) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a8fe8e270b30883ded902415fd9d7831`;

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // console.log(`fiveDays -> ${JSON.stringify(data)}`);
                    displayForecast(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        });
}

function displayForecast(data) {
    console.log(data)
    let count = 8;
    let forecastData = [0, count, count * 2, count * 3, count * 4];
    var cityCard = document.querySelector('#five-day');
    cityCard.innerHTML = "";

    for (var i = 0; i < forecastData.length; i++) {
        console.log(forecastData[i]);
        temp = data.list[forecastData[i]].main.temp;
        humidity = data.list[forecastData[i]].main.humidity;
        wind = data.list[forecastData[i]].wind.speed;
        var cityCard = document.querySelector('#five-day');
        var card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
        <h2>${weatherIcon}</h2>
        <p>Temp: ${temp}°F</p>
        <p>Wind: ${wind} MPH</p>
        <p>Humidity: ${humidity} %</p>
        `;
        cityCard.appendChild(card);
    }

}

function displayWeather(data) {
    var weatherCard = document.querySelector('#city-forecast');
    weatherCard.innerHTML = "";

    var card = document.createElement('div');
    card.classList.add('forecast-box');
    card.innerHTML = `
    <h2>${cityName} ${weatherIcon}</h2>
    <p>Temp: ${temp}°F </p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${humidity} %</p>
    `;
    weatherCard.appendChild(card);
}