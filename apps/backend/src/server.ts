import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import axios from "axios";

const apiUrl = process.env.WEATHER_BASE_URL || "";
const apiKey = process.env.WEATHER_API_KEY || "";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      return res.json({ status: "ok" });
    })
    .get("/weather", async (req, res) => {
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

      try {
        const query = city || `${latitude},${longitude}`;
        const response = await axios.get(
          `${apiUrl}/current.json?key=${apiKey}&q=${query}`
        );
        res.json(response.data);
      } catch (error: any) {
        const status = error.response?.status || 500;
        const errorMessage = error.response?.data?.error || {
          message: "Internal Server Error",
          code: status,
        };
        res.status(status).json({ error: errorMessage });
      }
    })
    .get("/search", async (req, res) => {
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
      } catch (error: any) {
        const status = error.response?.status || 500;
        const errorMessage = error.response?.data?.error || {
          message: "Internal Server Error",
          code: status,
        };
        res.status(status).json({ error: errorMessage });
      }
    });

  return app;
};
