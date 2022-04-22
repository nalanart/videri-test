import CurrentForecast from '../../components/current-forecast/current-forecast';
import WeeklyForecast from '../../components/weekly-forecast/weekly-forecast';

const Home = () => {
  return (
    <div>
      <CurrentForecast />
      <WeeklyForecast />
    </div>
  );
};

export default Home;
