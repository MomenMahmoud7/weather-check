import request from "supertest";
import { createServer } from "../server";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env.test"),
});

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const apiUrl = process.env.WEATHER_BASE_URL || "";
const apiKey = process.env.WEATHER_API_KEY || "";

describe("Weather API Server", () => {
  let server: any;

  beforeAll((done) => {
    server = createServer().listen(5001, () => done());
  });

  afterAll((done) => {
    server.close(() => done());
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /weather", () => {
    const mockWeatherResponse = {
      location: { name: "London", country: "UK" },
      current: { temp_c: 12.3, condition: { text: "Cloudy" } },
    };

    it("should return weather data when city is provided", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherResponse });

      const response = await request(server)
        .get("/weather")
        .query({ city: "London" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockWeatherResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${apiUrl}/current.json?key=${apiKey}&q=London`
      );
    });

    it("should return weather data when latitude and longitude are provided", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherResponse });

      const response = await request(server)
        .get("/weather")
        .query({ latitude: "51.5074", longitude: "-0.1278" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockWeatherResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${apiUrl}/current.json?key=${apiKey}&q=51.5074,-0.1278`
      );
    });

    it("should return 400 when no parameters are provided", async () => {
      const response = await request(server).get("/weather");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: {
          message:
            "Either city or both latitude and longitude must be provided",
          code: 400,
        },
      });
    });

    it("should return 400 when only latitude is provided", async () => {
      const response = await request(server)
        .get("/weather")
        .query({ latitude: "51.5074" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: {
          message:
            "Either city or both latitude and longitude must be provided",
          code: 400,
        },
      });
    });

    it("should handle API errors properly", async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          status: 500,
          data: { error: { message: "API Error", code: 500 } },
        },
      });

      const response = await request(server)
        .get("/weather")
        .query({ city: "UnknownCity" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: { message: "API Error", code: 500 },
      });
    });
  });

  describe("GET /search", () => {
    const mockSearchResults = [
      { id: 1, name: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
      { id: 2, name: "London", country: "Canada", lat: 42.98, lon: -81.25 },
    ];

    it("should return search results when query is provided", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockSearchResults });

      const response = await request(server)
        .get("/search")
        .query({ query: "London" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSearchResults);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${apiUrl}/search.json?key=${apiKey}&q=London`
      );
    });

    it("should return 400 when no query is provided", async () => {
      const response = await request(server).get("/search");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: {
          message: "Search query is required",
          code: 400,
        },
      });
    });

    it("should return empty array if no results are found", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] });

      const response = await request(server)
        .get("/search")
        .query({ query: "NonExistentPlace" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should handle API errors in search", async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          status: 500,
          data: { error: { message: "API Failure", code: 500 } },
        },
      });

      const response = await request(server)
        .get("/search")
        .query({ query: "London" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: { message: "API Failure", code: 500 },
      });
    });
  });
});
