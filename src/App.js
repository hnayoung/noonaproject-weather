import './App.css';
import { useEffect, useState  } from 'react';
import WeatherBox from './component/WeatherBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다 
// 2. 날씨정보에는 도시, 섭씨, 화씨, 날씨 상태 
// 3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른 도시)
// 4. 도시버튼을 클릭할 때 도시별 날씨가 나온다 
// 5. 현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다 
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다 



function App() {

  const [apiError, setAPIError] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities = ['paris','new york','tokyo','seoul'];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat,lon)
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1a7bac6dc489c7b87578621a97b8cbae&units=metric&units=imperial`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  }
  

  const getWeatherByCity = async () =>{
    try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1a7bac6dc489c7b87578621a97b8cbae&units=metric&units=imperial`; 
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  }

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(()=>{
    if(city==="") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  },[city]);

  return (
    <div>
      
      {loading ? ( 
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <ClipLoader
        color = "#000000"
        loading={loading}
        size={150} />
        </div>
      ) : !apiError ? (
      <div className="container">
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities}  handleCityChange={handleCityChange} setCity={setCity}/>
      </div>
      ) : (
        apiError
      )}
      
      </div>
      
  );
}



export default App;
