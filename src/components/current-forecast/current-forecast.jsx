import { useState } from 'react';
import { getWeatherIconUrl } from '../../utils/openWeatherMap';

import { Box, Button, Collapse, Typography } from '@mui/material';

const CurrentForecast = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleMoreDetailsClick = () => setOpen(!open);

  if (data) {
    const {
      location,
      current: { temp, wind_speed, humidity, pressure, visibility, weather },
    } = data;
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
  }
};

export default CurrentForecast;
