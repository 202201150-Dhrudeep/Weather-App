import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search_icon.png'
import windy from '../assets/windy.png'
import clear from '../assets/clear.png'
import snow from '../assets/snow.png'
import humidity from '../assets/humidity.png'
import drizzle from '../assets/drizzle.png'
const Weather = () => {
    const [weatherData, setWeatherData] = useState(false)
    const inputRef = useRef();
    const search = async (city) => {
        city = city.trim();
        if (city == "") {
            alert("Enter City name");
            return
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const res = await fetch(url);
            console.log("Hi")
            const data = await res.json();
            console.log(data)

            if (!res.ok) {
                alert(data.message)
                return
            }
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather && data.weather[0] ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : clear
            });
            console.log(data);
        } catch (err) {
            setWeatherData(false)
            console.error("Error fetching weather data", err)
        }

    }

    useEffect(() => {
        search(" Delhi ")
    }, [])
    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder="Search..." ref={inputRef} />
                <img src={search_icon} alt="" className="" onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData ? <>

                <img src={weatherData.icon} alt="" className="icon" />
                <p className="temp">{weatherData.temp}° C</p>
                <p className="location">{weatherData.location}</p>

                <div className="weather-data">
                    <div className="col">
                        <img src={humidity} alt="" />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>

                    <div className="col">
                        <img src={windy} alt="" />
                        <div>
                            <p>{weatherData.windSpeed} km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>


            </> : <></>}


        </div>

    )
}

export default Weather
