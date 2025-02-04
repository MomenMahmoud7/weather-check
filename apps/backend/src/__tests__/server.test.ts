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
});
