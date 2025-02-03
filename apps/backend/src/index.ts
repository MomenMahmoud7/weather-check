import { log } from "@repo/logger";
import dotenv from "dotenv";
import axios, { AxiosError } from "axios";
import { Request, Response } from "express";

import { createServer } from "./server";

dotenv.config();

const port = process.env.PORT || 5001;
const apiUrl = process.env.WEATHER_BASE_URL || "";
const apiKey = process.env.WEATHER_API_KEY || "";

const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});

interface WeatherQueryParams {
  city?: string;
  latitude?: string;
  longitude?: string;
}

interface SearchQueryParams {
  query?: string;
}

interface WeatherError {
  message: string;
  code?: number;
}

server.get(
  "/weather",
  async (
    req: Request<object, object, object, WeatherQueryParams>,
    res: Response
  ) => {
    const { city, latitude, longitude } = req.query;

    if (!city && (!latitude || !longitude)) {
      return res.status(400).json({
        error: {
          message:
            "Either city or both latitude and longitude must be provided",
          code: 400,
        },
      });
    }

    const query = city ? city : `${latitude},${longitude}`;

    try {
      const response = await axios.get(
        `${apiUrl}/current.json?key=${apiKey}&q=${query}`
      );
      res.json(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorResponse: WeatherError = {
        message: axiosError.message || "Failed to fetch weather data",
        code: axiosError.response?.status,
      };
      res
        .status(axiosError.response?.status || 500)
        .json({ error: errorResponse });
    }
  }
);

server.get(
  "/search",
  async (
    req: Request<object, object, object, SearchQueryParams>,
    res: Response
  ) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        error: {
          message: "Search query is required",
          code: 400,
        },
      });
    }

    try {
      const response = await axios.get(
        `${apiUrl}/search.json?key=${apiKey}&q=${query}`
      );
      res.json(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorResponse: WeatherError = {
        message: axiosError.message || "Failed to fetch search results",
        code: axiosError.response?.status,
      };
      res
        .status(axiosError.response?.status || 500)
        .json({ error: errorResponse });
    }
  }
);
