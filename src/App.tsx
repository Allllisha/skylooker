import React, { useState } from "react";
import  { WeatherData } from './components/WeatherData';
// import  { WeatherMain } from './components/WeatherMain';
import './App.css';
import Search from './components/Search';
import axios from 'axios'
import moment from "moment";


function App() {
  const [weathers, setWeathers] = useState<WeatherData[]>([]);

  const search = async (searchValue: string) => {
    const res = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=18aa05ab051f4acc8345aeeb8a4acf3b`);
    setWeathers(res.data.list);

    console.log(res.data)
  };


  return (
    <div className="App">
      < Search search={search}/>
      
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
    </div>
  );
}

export default App;
