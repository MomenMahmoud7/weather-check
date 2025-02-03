export interface WeatherInfo {
  location: {
    name: string;
    country: string;
    region: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
  };
}

export interface WeatherDisplayProps {
  weatherData?: WeatherInfo;
  isLoading?: boolean;
}
