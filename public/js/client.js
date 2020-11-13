const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    // console.log(location);
    fetch('http://localhost:3000/weather/?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            // geocode.textContent = data.error;
            // forecast.textContent = '';
            document.getElementById("geocodeData").innerText = data.error;
            document.getElementById("forecastData").innerText = '';
        } else {
            // geocode.textContent = data.Location;
            // forecast.textContent = data.Forecast;
            document.getElementById("geocodeData").innerText = data.Location;
            document.getElementById("forecastData").innerText = data.Forecast;
        }
        
    });
});
});