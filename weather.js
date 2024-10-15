const main = document.querySelector('.main');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.unable-to-find');
const timeBox = document.querySelector('.time-box');


search.addEventListener('click', () => {
    const APIKey = 'f5f08f0776cb02fcaaa6cee6b3c1e896';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                main.style.height = '455px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                timeBox.classList.remove('active');
               
                error404.classList.add('active');
               
                return;
            }

            main.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
           
            error404.classList.remove('active');
            timeBox.classList.add('active');
            
            


            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

            // Calculate and display city time
            const timezoneOffset = json.timezone; // in seconds
            const localTime = new Date(Date.now() + (timezoneOffset * 1000));
            document.getElementById('city-time').textContent = localTime.toUTCString().replace('GMT', 'UTC');


            


            
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById('city-time').textContent = "Unable to fetch weather data";

        });
});
