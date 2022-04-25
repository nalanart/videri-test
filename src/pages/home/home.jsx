import { Box, Container } from '@mui/material';
import CurrentForecast from '../../components/current-forecast/current-forecast';
import Map from '../../components/map/map';
import WeeklyForecast from '../../components/weekly-forecast/weekly-forecast';
import WeeklyForecastChart from '../../components/weekly-forecast/weekly-forecast-chart';

const Home = ({ data }) => {
  return (
    <Container maxWidth='xl' sx={{ paddingBlock: 5 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 2,
          mb: 5,
        }}
      >
        <CurrentForecast data={data} />
        <Map data={data} />
      </Box>
      <WeeklyForecast data={data} />
      <WeeklyForecastChart data={data} height={400} />
    </Container>
  );
};

export default Home;
