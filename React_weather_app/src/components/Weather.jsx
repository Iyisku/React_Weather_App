import React, { useState } from 'react'

export default function Weather(props) {
  const { apikey, apibaseurl } = props;

  const [search, setSearch] = useState("");
  const [openWeather, setweather] = useState(null);

  const searchPressed = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      alert("Please enter a city name.");
      return;
    }

    fetch(`${apibaseurl}?q=${search}&units=metric&appid=${apikey}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === "404") {
          setweather(null);
          alert("City not found. Please enter a valid city name.");
        } else {
          setweather(result);
        }
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <>
      <h1
        className="mb-0 text-center fw-bold"
        style={{
          color: "#fff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Weather App
      </h1>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div
          className="card text-white shadow-lg p-4 border-5"
          style={{
            width: "400px",
            background: "linear-gradient(to bottom, #87ceeb, #00bfff)",
            color: "#fff",
          }}
        >
          <div className="card-body">
            <form className="d-flex gap-2 align-items-center mb-4">
              <input
                type="text"
                placeholder="City Name"
                className="form-control text-center fw-bold"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={searchPressed}
                className="btn btn-outline-light fw-bold"
              >
                Search
              </button>
            </form>

            <div className="text-center">
              {openWeather ? (
                <>
                  <h1 className="mb-3">{openWeather.name}</h1>
                  <p className="mb-1">Temperature: {openWeather.main.temp}°C</p>
                  <p className="mb-1">Condition: {openWeather.weather[0].main}</p>
                  <p className="mb-1">
                    Description: {openWeather.weather[0].description}
                  </p>
                  <p>
                    <img
                      src={`http://openweathermap.org/img/wn/${openWeather.weather[0].icon}@2x.png`}
                      alt={openWeather.weather[0].description}
                    />
                  </p>
                </>
              ) : (
                <p>Enter a valid city name.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
