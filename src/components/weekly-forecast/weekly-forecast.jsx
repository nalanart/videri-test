import { Box, Typography } from '@mui/material';
import ForecastCard from '../forecast-card/forecast-card';

const WeeklyForecast = ({ data }) => {
  return (
    <>
      <Typography variant='h5'>Next 7 days</Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflow: 'auto',
          paddingBlock: 2,
          mb: 5,
        }}
      >
        {data.daily.slice(1).map((day, index) => (
          <ForecastCard key={index} day={day} />
        ))}
      </Box>
    </>
  );
};

export default WeeklyForecast;
