export const getWeatherIconUrl = (icon) => {
  if (typeof icon !== 'string') return;
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};
