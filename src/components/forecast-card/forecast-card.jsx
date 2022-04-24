import {
  getDayFromUnixTimestamp,
  getWeatherIconUrl,
} from '../../utils/openWeatherMap';
import { Box, Typography } from '@mui/material';

const ForecastCard = ({ day }) => {
  const {
    dt,
    pop,
    temp: { min, max },
  } = day;
  return (
    <Box
      sx={{
        flex: '1 1 0',
        border: '1px solid #efefef',
        boxShadow: '0 3px 6px #00000029',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ textAlign: 'center' }} variant='h5'>
        {getDayFromUnixTimestamp(dt).toUpperCase()}
      </Typography>
      <img
        src={getWeatherIconUrl(day.weather[0].icon)}
        alt={day.weather[0].main}
      />
      <Typography>{day.weather[0].main}</Typography>
      <Typography>High: {max}</Typography>
      <Typography>Low: {min}</Typography>
      <Typography>Pop: {pop}</Typography>
    </Box>
  );
};

export default ForecastCard;
