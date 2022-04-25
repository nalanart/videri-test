import { useState } from 'react';
import { getWeatherIconUrl } from '../../utils/openWeatherMap';

import { Box, Button, Collapse, Paper, Typography } from '@mui/material';

const CurrentForecast = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleMoreDetailsClick = () => setOpen(!open);

  if (data) {
    const {
      location,
      current: { temp, wind_speed, humidity, pressure, visibility, weather },
    } = data;
    return (
      <Paper sx={{ padding: 2, height: 'fit-content' }}>
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Box
            sx={{
              display: { sm: 'flex' },
              justifyContent: { sm: 'space-between' },
            }}
          >
            <Typography variant='h4'>{location}</Typography>
            <Typography variant='h5'>{weather[0].main}</Typography>
          </Box>
          <Box
            sx={{
              display: { sm: 'flex' },
              justifyContent: { sm: 'space-between' },
            }}
          >
            <img
              src={getWeatherIconUrl(weather[0].icon)}
              alt={weather[0].main}
              width='100'
              height='100'
            />
            <Box sx={{ textAlign: { sm: 'right' }, mt: { sm: 2 } }}>
              <Typography variant='h2'>{temp} °C</Typography>
              <Typography>Low of {data.daily[0].temp.min} °C</Typography>
              <Typography>High of {data.daily[0].temp.max} °C</Typography>
            </Box>
          </Box>
          <Button onClick={handleMoreDetailsClick}>
            {open ? 'Less Details' : 'More Details'}
          </Button>
          <Collapse in={open}>
            <Box
              sx={{
                display: { xs: 'grid', md: 'flex' },
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: { xs: 1, md: 5 },
                textAlign: { sm: 'left' },
              }}
            >
              <Typography variant='subtitle1'>
                Winds: {wind_speed} m/s
              </Typography>
              <Typography variant='subtitle1'>Humidity: {humidity}%</Typography>
              <Typography variant='subtitle1'>
                Pressure: {pressure} hPa
              </Typography>
              <Typography variant='subtitle1'>
                Visibility: {visibility} m
              </Typography>
            </Box>
          </Collapse>
        </Box>
      </Paper>
    );
  }
};

export default CurrentForecast;
