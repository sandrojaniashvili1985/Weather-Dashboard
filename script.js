

const myresult = [];
let citys = ['tel-aviv', 'haifa', 'petah tikva', "Be'er Sheva", 'Eilat', "Holon", "Netanya"];
async function geetWeatherByLocation(arr, i = 0) {
  const day = i + 1;
  for (let i = 0; i < arr.length; i++) {
    const city = arr[i];
    const url = `http://api.weatherapi.com/v1/future.json?key=951f5c3c6ba54e38a7d155439230210&q=israel ${city}&aqi=no&dt=2023-11-0${day}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a9caded0ebmsh3a5bdee0457e619p175b7cjsn2f3c38bfb3d0',
        'X-RapidAPI-Host': 'forecast9.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options);
    const result = JSON.parse(await response.text())
    myresult.push(await result);
  }
  if (i >= 3) {
    return myresult;
  } else {
    return geetWeatherByLocation(arr, ++i);
  }
}



function showEeather(cityName, temp, icon_src, description, data) {
  $('main').append(`
  <div class="weather">
    <div class="weather__city">
    <div class="weather__city__date">date: ${data}</div>
      <div class="weather__city__name">${cityName}</div> <br>
      <div class="weather__city__temp">${temp} deg</div>
    </div>
    <div class="weather__icon"><img src = ${icon_src}></div>
    <div class="weather__description">${description}</div>
  </div>
  `)
}
//   .then((result) => console.log(result));


document.addEventListener('DOMContentLoaded', async (event) => {
  const apiResult = await geetWeatherByLocation(citys);
  apiResult.forEach((element) => {
    const cityName = element.location.country + ' ' + element.location.name,
      temp = element.forecast.forecastday[0].day.avgtemp_c,
      icon_src = element.forecast.forecastday[0].day.condition.icon,
      data = element.forecast.forecastday[0].date,
      description = element.forecast.forecastday[0].day.condition.text;

    showEeather(cityName, temp, icon_src, description, data);
  });
})


