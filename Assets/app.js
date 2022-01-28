// define variables
// var searchField = document.querySelector("#search-term").value;
var searchButton = document.querySelector("#search-button");
var lat = "";
var lon = "";
var city = "";
var fetchButton = document.querySelector("#fetch-button");
var currentDay = document.querySelector(".city");
var currentDate = moment().format("L");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var uv = document.querySelector(".uv");
var date = document.querySelector(".date");

function init() {
  headerRow();
}

// creates onload
function headerRow() {
  var headerText = $("<h1>")
    .text("Weather Dashboard")
    .attr({ class: "align-middle m-auto text-white" });
  $(".row1").append(headerText);
}

init();

// fetch api response
function getCoordinatesApi(city) {
  city.preventDefault();
  var searchField = document.querySelector("#search-term").value;
  var city = searchField;
  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=80209709c75d143fbea0f02cb9a2dd95`;
  var requestUrl2;

  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat);
      console.log(lon);
      requestUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=80209709c75d143fbea0f02cb9a2dd95&units=imperial`;
      console.log(requestUrl2);
      fetch(requestUrl2)
        .then(function (response) {
          console.log(response.status);
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          // var cityDate = document.createElement("p");
          // var temp = document.createElement("p");
          // var wind = document.createElement("p");
          // var humidity = document.createElement("p");
          // var uv = document.createElement("p");
          cityDate = city;
          var temptext = data.current.temp;
          windtext = data.current.wind_speed;
          humiditytext = data.current.humidity;
          uvtext = data.current.uvi;
          console.log(cityDate);
          currentDay.append(cityDate);
          date.append(currentDate);
          temp.append(temptext);
          wind.append(windtext);
          humidity.append(humiditytext);
          uv.append(uvtext);
          // var cardinfo = document.getElementById("card-info");
          // cardinfo.innerHTML = "";
          // for (var i = 0; i < 5; i++) {
          //   console.log(data[i]);
          //   var date = document.createElement("h1");
          //   var icon = document.createElement("i");
          //   var cardTemp = document.createElement("p");
          //   var cardWind = document.createElement("p");
          //   var cardHumidity = document.createElement("p");
          //   var html = 
          //   '<div class="card col-md-12 border-0 d-inline card1">'
          //   '<div class="card-body col-2 d-inline bg-dark card1">'
          //       '<h1>${data[i].name}</h1>'
          //       '<i>${data[i].street}</i>'
          //       '<p>${"Temp: " + data[i].distance + "<span>&#176;</span>F"}</p>'
          //       '<p>${"Wind: " + data[i].directions + "MPH"}</p>'
          //       '<p>${"Humidity: " + data[i].comments + "<span>&#37;</span>"}</p>'
          //   '</div>'
          //   '</div>'
          //   cardinfo.innerHTML += html;
          // }
         
        });
    });
}

fetchButton.addEventListener("click", getCoordinatesApi);
