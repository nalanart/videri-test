import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CurrentForecast from '../../components/current-forecast/current-forecast';
import Map from '../../components/map/map';
import WeeklyForecast from '../../components/weekly-forecast/weekly-forecast';
import WeeklyForecastChart from '../../components/weekly-forecast/weekly-forecast-chart';

import DATA from '../../weather.json';

const Home = () => {
  const [width, setWidth] = useState();
  const containerRef = useRef();

  const handleResize = () => {
    const styles = window.getComputedStyle(containerRef.current);
    setWidth(
      containerRef.current.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight)
    );
  };

  useEffect(() => {
    handleResize();
    // could use a debouncer to prevent too many redrawings of the chart
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container maxWidth='xl' sx={{ paddingBlock: 5 }} ref={containerRef}>
      <CurrentForecast />
      <WeeklyForecast data={DATA} />
      <WeeklyForecastChart data={DATA} height={300} width={width} />
      <Map data={DATA} />
    </Container>
  );
};

export default Home;
