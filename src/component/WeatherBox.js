import React from 'react'

const WeatherBox = ({weather}) => {
    console.log("weather", weather)
  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <h2>{weather?.main.temp} K /  {((weather?.main.temp - 273.15) * 9/5 + 32).toFixed(1)}°F </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox;
