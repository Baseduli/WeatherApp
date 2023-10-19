var inputFormEl = document.querySelector(".form-input");
var APIKey = "a8fe8e270b30883ded902415fd9d7831";

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

function displayForecast(data) {
    var cityCard = document.querySelector('#city-forecast');
    var temp = data.main.temp;
    var card = document.createElement('card');
    card.innerHTML = `
    <p>Temperature: ${temp}</p>
    <p>Wind: ${data.wind.speed} MPH</p>
    <p>Humidity: ${data.main.humidity} %</p>
    `;
    cityCard.appendChild(card);
}

function displayWeather(data) {
    var weatherCard = document.querySelector('#five-day');
    var temp = data.main.temp;
    var card = document.createElement('card');
    card.innerHTML = `
    <p>Temperature: ${temp}</p>
    <p>Wind: ${data.wind.speed} MPH</p>
    <p>Humidity: ${data.main.humidity} %</p>
    `;
    weatherCard.appendChild(card);
}

function getWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=a8fe8e270b30883ded902415fd9d7831";

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data);
                    displayForecast(data, city);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        });
}