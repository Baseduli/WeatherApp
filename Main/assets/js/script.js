var inputFormEl = document.querySelector(".form-input");

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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=3f0f9a8e4f2b1c8e0c4e6f9b9b4a5e6d";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, city);
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