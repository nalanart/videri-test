import { Box, Typography } from '@mui/material';

const daysMap = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

const getDayFromUnixTimestamp = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const day = date.getDay();
  return daysMap[day];
};

const ForecastCard = ({ day }) => {
  const {
    dt,
    pop,
    temp: { min, max },
  } = day;
  return (
    <Box
      sx={{
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
        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
      />
      <Typography>{day.weather[0].main}</Typography>
      <Typography>High: {max}</Typography>
      <Typography>Low: {min}</Typography>
      <Typography>Precipitation: {pop}</Typography>
    </Box>
  );
};

export default ForecastCard;
