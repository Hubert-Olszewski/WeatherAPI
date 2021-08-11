let lat;
let lon;
const apiKey = "248d369aa6322178f4f2620b2da7f29c";

function startApp(){
    console.clear();
    console.log("Siema co tam? Czego tutaj szukasz? XD");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                console.log("Szerokość geo:",lat,"Długość geo:",lon);
                
                getWeatherData();
            }
        );
    }
}

function getWeatherData(){
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    console.log(url);

    fetch(url).then(function(response){
        response.json().then(function(data){
            console.log(data);
            updateWeatherData(data);
        });
    });
}

function updateWeatherData(data){
    const sunRise = new Date(data.sys.sunrise * 1000);
    const sunSet = new Date(data.sys.sunset * 1000);
    const date = dayjs();

    document.getElementById("date").innerHTML = date.format("YYYY-MM-DD HH:mm");
    document.getElementById("temp").innerHTML = data.main.temp + " °C";
    document.getElementById("humidity").innerHTML = data.main.humidity + " %";
    document.getElementById("pressure").innerHTML = data.main.pressure + " hPa";
    document.getElementById("sunRise").innerHTML = sunRise.getHours() + ":" + sunRise.getMinutes();
    document.getElementById("sunSet").innerHTML = sunSet.getHours() + ":" + sunSet.getMinutes();
    document.getElementById("windSpeed").innerHTML = Math.round((data.wind.speed * 0.001 * 3600) * 10) / 10 + " km/h";
    //document.getElementById("cloudPerc").innerHTML = data.clouds.all;

    let imgUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    document.getElementById("currentWeatherImg").setAttribute("src", imgUrl);

    const locationLink = document.getElementById("locationLink");
    locationLink.innerHTML = data.name;
    locationLink.href = `https://openstreetmap.org/#map=20/${lat}/${lon}`;
}