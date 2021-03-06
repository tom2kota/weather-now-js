/*
    Weather NOW! ... JS App
    get API keys: https://home.openweathermap.org/api_keys
    flags:   https://semantic-ui.com/elements/flag.html
    icons: https://semantic-ui.com/elements/icon.html
 */

console.log('Weather NOW! ... JS App init')

const APP_KEY = '39abfd6ed55b4e52a6de04ae6c0b1296';


const checkStatusAndParse = response => (!response.ok) ? `fetch response is NOT OK ... status code: ${response.status}` : response;
const parseData = data => data.json();
const logResponse = r => console.log(r);
const logError = error => console.log('Something went wrong! ... fetch error: ', error);

printCountryData = (data) => {
    // console.log(data);
    document.querySelector('#countryFlag').className = `${data.sys.country.toString().toLocaleLowerCase()} flag`;
    document.querySelector('#countryCode').textContent = data.sys.country.toString();
    document.querySelector('#countryName').textContent = data.name;
    document.querySelector('#countryTemperature').textContent = data.main.temp.toFixed(0).toString() + ' C';
    document.querySelector('#countryWeather').textContent = data.weather.map(x => x.description).toString();
    document.querySelector('#countryError').textContent = '';
}

printError = (error) => {
    document.querySelector('#countryError').textContent = 'Something went wrong! ... try to search another city';
}

const searchWeather = (WEATHER_API_URL) => fetch(WEATHER_API_URL)
    .then(checkStatusAndParse)
    .then(parseData)
    // .then(logResponse)
    .then(printCountryData)
    // .catch(logError)
    .catch(printError)

const searchCountry = () => {
    // console.log('Search country: ');
    let WEATHER_CITY = document.querySelector('#weatherCountry').value.trim();
    let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&units=metric&appid=${APP_KEY}`;
    // console.log(WEATHER_CITY);
    // regex test: https://regexr.com/
    let passRegex = WEATHER_CITY.search(/^[a-zа-я-\s]{3,40}$/gi);
    (passRegex) ? printError() : searchWeather(WEATHER_API_URL);
}

const triggerOnEnter = (event) => (event.code === 'Enter') ? searchCountry() : event.preventDefault();

document.querySelector('#weatherSearchButton').addEventListener('click', searchCountry);
document.querySelector('#weatherCountry').addEventListener('keyup', triggerOnEnter);
