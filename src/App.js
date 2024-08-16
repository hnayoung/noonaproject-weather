import './App.css';
import { useEffect, useState  } from 'react';
import WeatherBox from './component/WeatherBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherButton from './component/WeatherButton';

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다 
// 2. 날씨정보에는 도시, 섭씨, 화씨, 날씨 상태 
// 3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른 도시)
// 4. 도시버튼을 클릭할 때 도시별 날씨가 나온다 
// 5. 현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다 
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다 



function App() {

  const [weather, setWeather] = useState(null);
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat,lon)
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1a7bac6dc489c7b87578621a97b8cbae&units=metric&units=imperial`;

    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }

  useEffect(()=>{
    getCurrentLocation()
   
  },[]);

  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather}/>
        <WeatherButton />
      </div>
    </div>
  );
}

export default App;
