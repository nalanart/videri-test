import { Container } from '@mui/material';
import CurrentForecast from '../../components/current-forecast/current-forecast';
import Map from '../../components/map/map';
import WeeklyForecast from '../../components/weekly-forecast/weekly-forecast';

import DATA from '../../weather.json';

const Home = () => {
  return (
    <Container maxWidth='xl'>
      <CurrentForecast />
      <WeeklyForecast data={DATA} />
      <Map data={DATA} />
    </Container>
  );
};

export default Home;
