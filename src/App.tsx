import React, { useState } from "react";
import  { WeatherData } from './components/WeatherData';
import  { WeatherMain } from './components/WeatherMain';
import  { Main } from './components/Main';
import  { City } from './components/City';
import './App.css';
import Search from './components/Search';
import image from './image/smile.png';
import Footer from './components/Footer';
import axios from 'axios'
import moment from "moment";


function App() {
  const [weathers, setWeathers] = useState<WeatherData[]>([]);
  const [forcasts, setForcasts] = useState<WeatherMain[]>([]);
  const [degree, setDegrees] = useState<Partial<Main>>({})
  const [city, setCity] = useState<Partial<City>>({})
  const search = async (searchValue: string) => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_WEATHER}`);
    setWeathers(res.data.list);
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_WEATHER}`);
    setForcasts(response.data.weather);
    setDegrees(response.data.main);
    setCity(response.data)
    console.log(response.data)
  };

  return (
     <>
     <div className="name-search-bar">
     <div>
        <h2>Skylooker</h2>
      </div>
      <div className="face">
       <img src={image} alt="" />
      </div>
     <div>
      < Search search={search}/>
      </div>
      </div>
      <div className="forecast">
        <div className="forecast-info">
        <div className="city-name">
          <h1>{city.name}</h1>
        </div>
        <div className="degrees-like">
       <h2>{degree.feels_like}</h2>
        </div>
        </div>
        <div className="icons">
      {forcasts.map((forcast)=>{
        return(
          <div className="infos">
          <img src={`http://openweathermap.org/img/w/${forcast.icon}.png`}alt="" />
          <div className="forcast-description">
            {forcast.description}
          </div>
          </div>
        )
      })}
      </div>
       </div>
      <div className="weather-result">
      {weathers.map((weather)=>{
        return(
          <div className="Weather-cards">
           <div className="day-time">
          <h6>{moment(weather.dt_txt).format("llll")}</h6>
          </div>
          <div className="temp">
          {weather.main.temp}C°
          </div>
          {weather.weather.map((weather)=>{
            return(
              <div className="weather-description">
                <div className="weather-icons"> 
               <img src={`http://openweathermap.org/img/w/${weather.icon}.png`}alt="" />
               </div>
               <div>
                </div>
               <div>
                {weather.main}
                </div>
              </div>
            )
          })}
          </div>
        )
      })}
     </div>
     <Footer/>
     </>
  );
}

export default App;
