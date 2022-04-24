export const getWeatherIconUrl = (icon) => {
  if (typeof icon !== 'string') return;
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

const daysMap = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

export const getDayFromUnixTimestamp = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const day = date.getDay();
  return daysMap[day];
};
