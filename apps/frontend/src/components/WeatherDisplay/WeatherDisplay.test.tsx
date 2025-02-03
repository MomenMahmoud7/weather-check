import { render, screen } from "@testing-library/react";
import WeatherDisplay from "./WeatherDisplay";

const mockWeatherData = {
  location: {
    name: "London",
    country: "UK",
    region: "City of London",
  },
  current: {
    temp_c: 20,
    condition: {
      text: "Sunny",
    },
    humidity: 65,
    wind_kph: 15,
    feelslike_c: 19,
  },
};

describe("WeatherDisplay", () => {
  it("renders loading state", () => {
    render(<WeatherDisplay isLoading={true} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders nothing when no weather data is provided", () => {
    const { container } = render(<WeatherDisplay />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders weather information correctly", () => {
    render(<WeatherDisplay weatherData={mockWeatherData} />);

    expect(screen.getByTestId("weather-display")).toBeInTheDocument();
    expect(screen.getByTestId("location-name")).toHaveTextContent("London");
    expect(screen.getByTestId("location-details")).toHaveTextContent(
      "City of London, UK"
    );
    expect(screen.getByTestId("temperature")).toHaveTextContent("20°c");
    expect(screen.getByTestId("condition")).toHaveTextContent("Sunny");
    expect(screen.getByTestId("humidity")).toHaveTextContent("65%");
    expect(screen.getByTestId("wind-speed")).toHaveTextContent("15 km/h");
    expect(screen.getByTestId("feels-like")).toHaveTextContent("19°c");
  });
});
