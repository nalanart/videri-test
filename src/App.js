import { useEffect, useState } from 'react';
import Home from './pages/home/home';

const lat = 45.5088;
const lon = -73.5878;
const location = 'Montréal, Québec';
const units = 'metric';
const apiKey = 'c1ed4ecad7eed7cd47d23a9dee45dee3';
const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await (await fetch(url)).json();
      setData({
        ...data,
        location,
      });
    };
    getWeatherData();
  }, []);

  return <Home data={data} />;
};

export default App;
