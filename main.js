const apikey = "59bcb393164fa2d651ce8d996869399e";

const weatherDataShow = document.getElementById("weather-data");

const cityName = document.getElementById("city-input");

const formData = document.querySelector("form");

formData.addEventListener("submit", (event) => {
    event.preventDefault();
    const getName = cityName.value;
    getWeatherData(getName);
});

async function getWeatherData(getName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getName}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new error("Network response was not ok")
        }

            const data = await response.json();
            //console.log(data)

            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;

            const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}`,
            `wind speed: ${data.wind.speed}`,
            ];

            weatherDataShow.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

            weatherDataShow.querySelector(".temperature").textContent = `${temperature} °C`;

            weatherDataShow.querySelector(".description").textContent = `${description}`;


            weatherDataShow.querySelector(".details").innerHTML = details
            .map((detail) => `<p>${detail}</p>`)
            .join("");

       
       

       
    } catch (error) {
            weatherDataShow.querySelector(".icon").innerHTML = "";
            weatherDataShow.querySelector(".temperature").textContent = "";
            weatherDataShow.querySelector(
              ".description"
            ).textContent = `Please input valid city name`;

             weatherDataShow.querySelector(".details").innerHTML = '';
    }
}