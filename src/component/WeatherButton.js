import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, handleCityChange }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleButtonClick = (city) => {
    if (city === "current") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // 현재 위치를 설정하는 로직을 여기서 처리합니다.
          // 예를 들어, reverse geocoding을 통해 도시 이름을 가져올 수 있습니다.
          const currentLocation = `${latitude}, ${longitude}`;
          setSelectedCity(currentLocation);
          setCity(currentLocation);
          handleCityChange(currentLocation);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          // 위치 정보를 가져오는 데 실패했을 때의 처리 로직
          alert("현재 위치를 가져올 수 없습니다.");
        }
      );
    } else {
      setSelectedCity(city);
      setCity(city);
      handleCityChange(city);
    }
  };

  return (
    <div className="menu-container">
      <Button
        variant={`${selectedCity === "current" ? "warning" : "outline-warning"}`}
        onClick={() => handleButtonClick("current")}
      >
        Current Location
      </Button>

      {cities.map((item, index) => (
        <Button
          variant={`${selectedCity === item ? "warning" : "outline-warning"}`}
          key={index}
          onClick={() => handleButtonClick(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

export default WeatherButton;
