const WeatherWidget = () => {
  return (
    <div className="weather-widget max-w-full overflow-hidden">
      <iframe
        className="w-full h-auto"
        src="https://indify.co/widgets/live/weather/woWdrlmIsOTKRkrY7RUN"
        title="Weather Widget"
        frameBorder="0"
        style={{ minHeight: "200px" }}
      ></iframe>
    </div>
  );
};

export default WeatherWidget;
