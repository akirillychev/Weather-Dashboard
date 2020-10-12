$(".btn-primary").on("click", function (event) {
    var cityInput = $("#searchTerms").val();
    callWeatherApi(cityInput, true);
});

var callWeatherApi = function (cityInput, addToList) {

    var APIKey = "6c3b36f4ce65e45a8e571f022f2a7c77"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityInput + "&appid=" + APIKey;
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + cityInput + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(response);
             

            var weatherIcon = response.weather[0].icon;

            $("#cityName").html(response.name + " (" + new Date().toLocaleDateString() + ")");
            $("#mainIcon").html("<img src='" + "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png" + "'>")
            $("#temperature").html("Temperature: " + response.main.temp + " &#8457;");

            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH ")
            $("#uv-index").text("UV Index");
        });


    $.ajax({
        url: fiveDayURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            var forecastIndex = 1

            for (i = 6; i < response.list.length; i += 8) {

                var fivedayIcon = response.list[i].weather[0].icon;

                $("#forecast" + forecastIndex).html("").append("<div>" + new Date(response.list[i].dt_txt).toLocaleDateString() + "<br>" + "<img src='" + "http://openweathermap.org/img/wn/" + fivedayIcon + "@2x.png" + "'>" + "</div>");
                $("#forecastIcon").html(response.list[i].weather[0].icon);
                $("#forecast" + forecastIndex).append("<div class='frcstTemp'>" + "Temp: " + response.list[i].main.temp + " &#8457;" + "</div>");
                $("#forecast" + forecastIndex).append("<div>" + "Humidity: " + response.list[i].main.humidity + "%" + "</div>");
                forecastIndex++

            }
        });
}