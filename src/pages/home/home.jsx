import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CurrentForecast from '../../components/current-forecast/current-forecast';
import Map from '../../components/map/map';
import WeeklyForecast from '../../components/weekly-forecast/weekly-forecast';
import WeeklyForecastChart from '../../components/weekly-forecast/weekly-forecast-chart';

import DATA from '../../weather.json';

const Home = ({ data }) => {
  return (
    <Container maxWidth='xl' sx={{ paddingBlock: 5 }}>
      <CurrentForecast data={data} />
      <WeeklyForecast data={data} />
      <WeeklyForecastChart data={data} />
      <Map data={data} />
    </Container>
  );
};

export default Home;
