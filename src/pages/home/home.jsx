import { Container } from '@mui/material';
import CurrentForecast from '../../components/current-forecast/current-forecast';
import Map from '../../components/map/map';
import WeeklyForecast from '../../components/weekly-forecast/weekly-forecast';
import WeeklyForecastChart from '../../components/weekly-forecast/weekly-forecast-chart';

const Home = ({ data }) => {
  return (
    <Container maxWidth='xl' sx={{ paddingBlock: 5 }}>
      <CurrentForecast data={data} />
      <WeeklyForecast data={data} />
      <WeeklyForecastChart data={data} height={400} />
      <Map data={data} />
    </Container>
  );
};

export default Home;
