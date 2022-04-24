import { useEffect, useState } from 'react';
import { getWeatherIconUrl } from '../../utils/openWeatherMap';
import WEATHER_DATA from '../../weather.json';

import {
  Box,
  Button,
  Collapse,
  Container,
  Popover,
  Typography,
} from '@mui/material';

const lat = 45.5088;
const lon = -73.5878;
const units = 'metric';
const apiKey = 'c1ed4ecad7eed7cd47d23a9dee45dee3';
const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

const CurrentForecast = () => {
  const [currentForecast, setCurrentForecast] = useState(WEATHER_DATA);

  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   const getWeatherData = async () => {
  //     const data = await (await fetch(url)).json();
  //     setCurrentForecast(data);
  //   };
  //   getWeatherData();
  // }, []);
  const handleMoreDetailsClick = () => {
    setOpen(!open);
  };

  const {
    location,
    current: { temp, wind_speed, humidity, pressure, visibility, weather },
  } = currentForecast;
  console.log(currentForecast);
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='h4'>{location}</Typography>
          <img
            src={getWeatherIconUrl(weather[0].icon)}
            alt={weather[0].main}
            width='100'
            height='100'
          />
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant='h4'>{weather[0].main}</Typography>
          <Typography variant='h1'>{temp} °C</Typography>
          <Button onClick={handleMoreDetailsClick}>
            {open ? 'Less Details' : 'More Details'}
          </Button>
        </Box>
      </Box>
      <Collapse in={open}>
        <Box>
          <Typography>Wind Speed: {wind_speed} m/s</Typography>
          <Typography>Humidity: {humidity}%</Typography>
          <Typography>Pressure: {pressure} hPa</Typography>
          <Typography>Visibility: {visibility} m</Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default CurrentForecast;
