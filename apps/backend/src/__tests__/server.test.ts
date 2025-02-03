import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import { createServer } from "../server";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env.test"),
});

describe("Server", () => {
  const app = createServer();

  describe("Basic endpoints", () => {
    it("health check returns 200", async () => {
      const response = await request(app).get("/status");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: "ok" });
    });

    it("message endpoint says hello", async () => {
      const response = await request(app).get("/message/jared");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "hello jared" });
    });
  });

  describe("Weather endpoint", () => {
    it("returns 400 when no parameters are provided", async () => {
      const response = await request(app).get("/weather");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: {
          message:
            "Either city or both latitude and longitude must be provided",
          code: 400,
        },
      });
    });

    it("returns 400 when only latitude is provided", async () => {
      const response = await request(app)
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
  });

  describe("Search endpoint", () => {
    it("returns 400 when no query is provided", async () => {
      const response = await request(app).get("/search");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: {
          message: "Search query is required",
          code: 400,
        },
      });
    });
  });
});
