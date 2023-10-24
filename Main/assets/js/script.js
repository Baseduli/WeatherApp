var inputFormEl = document.querySelector(".form-input");
var APIKey = "a8fe8e270b30883ded902415fd9d7831";
var temp;
var wind;
var humidity;


function handleFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector("#search-input").value;
    var searchInputValTrimmed = searchInputVal.trim();

    if (searchInputValTrimmed) {
        getWeather(searchInputValTrimmed);
        inputFormEl.reset();
    } else {
        alert("Please enter a city name");
    }
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

    for (var i = 0; i < forecastData.length; i++) {
        console.log(forecastData[i]);
        temp = data.list[forecastData[i]].main.temp;
        humidity = data.list[forecastData[i]].main.humidity;
        wind = data.list[forecastData[i]].wind.speed;
        var cityCard = document.querySelector('#city-forecast');
        var card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
        <p>Temperature: ${temp}</p>
        <p>Wind: ${wind} MPH</p>
        <p>Humidity: ${humidity} %</p>
        `;
        cityCard.appendChild(card);
    }

}

function displayWeather(data) {
    var weatherCard = document.querySelector('#five-day');
    var card = document.createElement('div');
    // div.classList.add('forecast-card');
    card.innerHTML = `
    <p>Temperature: ${temp}</p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${humidity} %</p>
    `;
    weatherCard.appendChild(card);
}