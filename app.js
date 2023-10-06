const data = new Date(),
  Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
manthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', "Nov", 'Dec'];
manth = data.getMonth();

// day of the week
const _1 = data.getDay() + 1,
  _2 = data.getDay() + 2,
  _3 = data.getDay() + 3,
  _4 = data.getDay() + 4,
  _5 = data.getDay() + 5;
const arr = [_1, _2, _3, _4, _5]

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > 6) {
    arr[i] = arr[i] - 7
  }
}

const currentTtime = data.getHours() + ':' + (data.getMinutes().toString().length === 1 ? '0' + data.getMinutes() : data.getMinutes());
const dayOfWeek = `${Days[data.getDay()]}, ${data.getDate()} ${manthNames[manth]}`
$('firstDay').text()
const myresult = [];

// function get the weather information from the api
async function geetWeatherByLocation(city) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=951f5c3c6ba54e38a7d155439230210&q=${city}&days=6&aqi=no&alerts=no`;
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
  return result;
}

// function show the weather information dom manipulation
async function showweather(res) {
  // variables second container
  const mainTemp = $('#main-temp'),
    big_icon = $('.big_icon'),
    city = $('#city'),
    time = $('.h1_clock'),
    weekDays = $('#weekDays'),
    sunrise_hour = $('#sunrise_hour'),
    sunset_hour = $('#sunset_hour'),
    main_description = $('#main_description'),
    humidity = $('#humidity'),
    pressure = $('#pressure'),
    feelLike = $('#feelLike'),
    uv = $('#uv'),
    wind_speed = $('#wind_speed'),

    // variables third container
    firstDay_icon = $('#firstDay_icon'),
    secondDay_icon = $('#secondDay_icon'),
    thirdDay_icon = $('#thirdDay_icon'),
    fourthDay_icon = $('#fourthDay_icon'),
    fifthDay_icon = $('#fifthDay_icon'),

    firstDay_temp = $('#firstDay_temp'),
    secondDay_temp = $('#secondDay_temp'),
    thirdDay_temp = $('#thirdDay_temp'),
    fourthDay_temp = $('#fourthDay_temp'),
    fifthDay_temp = $('#fifthDay_temp'),

    firstDay = $('#firstDay'),
    secondDay = $('#secondDay'),
    thirdDay = $('#thirdDay'),
    fourthDay = $('#fourthDay'),
    fifthDay = $('#fifthDay'),

    // variables fourth container
    _12 = $('#_12'),
    _15 = $('#_15'),
    _18 = $('#_18'),
    _21 = $('#_21'),
    _00 = $('#_00'),

    _12_icon = $('#_12_icon'),
    _15_icon = $('#_15_icon'),
    _18_icon = $('#_18_icon'),
    _21_icon = $('#_21_icon'),
    _00_icon = $('#_00_icon'),

    _12_wind = $('#_12_wind'),
    _15_wind = $('#_15_wind'),
    _18_wind = $('#_18_wind'),
    _21_wind = $('#_21_wind'),
    _00_wind = $('#_00_wind'),

    wind_dir_12 = $('#wind_dir_12'),
    wind_dir_15 = $('#wind_dir_15'),
    wind_dir_18 = $('#wind_dir_18'),
    wind_dir_21 = $('#wind_dir_21'),
    wind_dir_00 = $('#wind_dir_00');

  // change size of the main img
  let changeSize = res.current.condition.icon
  let newSize = changeSize.split('/') //[4] = '128x128'.join('/')
  newSize[4] = '128x128'
  let sizeresult = newSize.join('/')

  // assign the values
  city.text(`${res.location.country}  ${res.location.name}`)
  big_icon.css('background-image', `url(${sizeresult})`)
  weekDays.text(`${Days[data.getDay()]}, ${data.getDate()} ${manthNames[manth]}`);
  mainTemp.text(res.current.temp_c)
  feelLike.text(res.current.feelslike_c)
  uv.text(res.current.uv)
  pressure.text(res.current.pressure_mb)
  time.text((res.location.localtime).split(' ')[1])
  main_description.text(res.current.condition.text)
  humidity.text(res.current.humidity)
  wind_speed.text(res.current.wind_kph)
  main_description.text(res.current.condition.text)
  sunrise_hour.text(res.forecast.forecastday[0].astro.sunrise)
  sunset_hour.text(res.forecast.forecastday[0].astro.sunset)

  firstDay.text(`${Days[arr[0]]}, ${data.getDate() + 1} ${manthNames[manth]}`)
  secondDay.text(`${Days[arr[1]]}, ${data.getDate() + 2} ${manthNames[manth]}`)
  thirdDay.text(`${Days[arr[2]]}, ${data.getDate() + 3} ${manthNames[manth]}`)
  fourthDay.text(`${Days[arr[3]]}, ${data.getDate() + 4} ${manthNames[manth]}`)
  fifthDay.text(`${Days[arr[4]]}, ${data.getDate() + 5} ${manthNames[manth]}`)

  _12.text(res.forecast.forecastday[0].hour[12].temp_c)
  _15.text(res.forecast.forecastday[0].hour[15].temp_c)
  _18.text(res.forecast.forecastday[0].hour[18].temp_c)
  _21.text(res.forecast.forecastday[0].hour[21].temp_c)
  _00.text(res.forecast.forecastday[1].hour[0].temp_c)

  _12_icon.attr('src', res.forecast.forecastday[0].hour[12].condition.icon)
  _15_icon.attr('src', res.forecast.forecastday[0].hour[15].condition.icon)
  _18_icon.attr('src', res.forecast.forecastday[0].hour[18].condition.icon)
  _21_icon.attr('src', res.forecast.forecastday[0].hour[21].condition.icon)
  _00_icon.attr('src', res.forecast.forecastday[1].hour[0].condition.icon)

  _12_wind.text(res.forecast.forecastday[0].hour[12].wind_kph)
  _15_wind.text(res.forecast.forecastday[0].hour[15].wind_kph)
  _18_wind.text(res.forecast.forecastday[0].hour[18].wind_kph)
  _21_wind.text(res.forecast.forecastday[0].hour[21].wind_kph)
  _00_wind.text(res.forecast.forecastday[1].hour[0].wind_kph)

  firstDay_icon.attr('src', res.forecast.forecastday[1].day.condition.icon)
  secondDay_icon.attr('src', res.forecast.forecastday[2].day.condition.icon)
  thirdDay_icon.attr('src', res.forecast.forecastday[3].day.condition.icon)
  fourthDay_icon.attr('src', res.forecast.forecastday[4].day.condition.icon)
  fifthDay_icon.attr('src', res.forecast.forecastday[5].day.condition.icon)

  firstDay_temp.text(res.forecast.forecastday[1].day.avgtemp_c)
  secondDay_temp.text(res.forecast.forecastday[2].day.avgtemp_c)
  thirdDay_temp.text(res.forecast.forecastday[3].day.avgtemp_c)
  fourthDay_temp.text(res.forecast.forecastday[4].day.avgtemp_c)
  fifthDay_temp.text(res.forecast.forecastday[5].day.avgtemp_c)

  wind_dir_12.text(res.forecast.forecastday[0].hour[12].wind_dir)
  wind_dir_15.text(res.forecast.forecastday[0].hour[15].wind_dir)
  wind_dir_18.text(res.forecast.forecastday[0].hour[18].wind_dir)
  wind_dir_21.text(res.forecast.forecastday[0].hour[21].wind_dir)
  wind_dir_00.text(res.forecast.forecastday[1].hour[0].wind_dir)

}

// event listener
document.addEventListener('DOMContentLoaded', async () => {
  let city
  const btn = $('#searchCity')

  btn.on('keypress', async (e) => {
    if (e.key === 'Enter') {
      city = btn.val();
      const res = await geetWeatherByLocation(city)
      // search validation
      // if (res.error || !((res.location.name).toLowerCase()).includes(btn.val().toLowerCase())) {
      //   return alert('City not found')
      // }
      // console.log(res);
      showweather(res)

    }
  })
})