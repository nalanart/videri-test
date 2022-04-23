import { Box } from '@mui/material';
import ForecastCard from '../forecast-card/forecast-card';

const WeeklyForecast = ({ data }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
      }}
    >
      {data.daily.slice(1).map((day, index) => (
        <Box key={index} sx={{ flex: '1 1 0' }}>
          <ForecastCard day={day} />
        </Box>
      ))}
    </Box>
  );
};

export default WeeklyForecast;
