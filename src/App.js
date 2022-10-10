import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const api = {
  key: "b0be164a28f2a303441216d5ecaffd5f",
  url: "https://api.openweathermap.org/data/2.5/",
};

function App() {

  const [search, setSearch] = useState("Cochin");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const getWeather = async () => {
        await axios
          .get(`${api.url}weather?q=${search}&units=metric&appid=${api.key}`)
          .then((Response) => {
            setData(Response.data);
            setInput("");
          });
      }
    };
    getWeather();
  }, [search]);

  let emoji = null;
  if (typeof data.main !== "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa-cloud-showers-heavy";
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa-cloud-bolt";
    } else if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-drizzle";
    } else if (data.weather[0].main === "Snow") {
      emoji = "fa-snowflake";
    } else if (data.weather[0].main === "Sunny") {
      emoji = "fa-sun";
    } else if (data.weather[0].main === "Mist") {
      emoji = "fa-smog";
    } else {
      emoji = "fa-cloud-sun";
    }
  } else {
    return (
      <div className="loading">
        <i className="fas fa-sync fa-spin"></i>
      </div>
    );
  }

  let d = new Date();
  let day = d.getDay();
  let date = d.toLocaleString("default", { weekday: "short" });
  let month = d.toLocaleString("default", { month: "short" });
  let year = d.getFullYear();

  let time = d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  let cover = null;
  if (typeof data.main !== "undefined") {
    if (data.weather[0].main === "Clouds") {
      cover = "cover-pic cloud";
    } else if (data.weather[0].main === "Rain") {
      cover = "cover-pic rain";
    } else if (data.weather[0].main === "Thunderstorm") {
      cover = "cover-pic thunder";
    } else if (data.weather[0].main === "Drizzle") {
      cover = "cover-pic drizzle";
    } else if (data.weather[0].main === "Snow") {
      cover = "cover-pic winter";
    } else if (data.weather[0].main === "Clear") {
      cover = "cover-pic sunny";
    } else if (data.weather[0].main === "Mist") {
      cover = "cover-pic mist";
    } else if (data.weather[0].main === "Haze") {
      cover = "cover-pic haze";
    } else {
      cover = "cover-pic random";
    }
  } else {
    return (
      <div className="loading">
        <i className="fas fa-sync fa-spin"></i>
      </div>
    );
  }

  return (
    <div>
      <div id="container" className={`${cover}`}>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="search">
              <input
                type="text"
                className="search-bar"
                placeholder="Search City"
                name="search"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                required
              />
              <button type="submit" className="fas fa-search"></button>
            </div>
          </form>

          {typeof data.main != "undefined" ? (
            <div className="main">
              <div className="data1">
                <h2 className="location">
                  {data.name}, {data.sys.country}
                </h2>
                <h4 className="date">
                  {day}, {date}-{month}-{year} <br />
                  {time}
                </h4>
              </div>

              <div className="data2">
                <br />
                <i className={`fa-solid ${emoji}`}></i>
                <p className="temp">{Math.round(data.main.temp)}°C</p>
                <h4 className="descr">{data.weather[0].main}</h4>
                <h4 className="temp-range">
                  {Math.round(data.main.temp_min)}°C |{" "}
                  {Math.round(data.main.temp_max)}°C
                </h4>
              </div>

              <div className="data3">
                <br />
                <h4 className="humidity">Humidity: {data.main.humidity}%</h4>
                <h4 className="wind">
                  Wind Speed: {data.wind.speed} metre/sec
                </h4>
                <br />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
