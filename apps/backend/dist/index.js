"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_logger = require("@repo/logger");
var import_dotenv = __toESM(require("dotenv"));
var import_axios = __toESM(require("axios"));

// src/server.ts
var import_body_parser = require("body-parser");
var import_express = __toESM(require("express"));
var import_morgan = __toESM(require("morgan"));
var import_cors = __toESM(require("cors"));
var createServer = () => {
  const app = (0, import_express.default)();
  app.disable("x-powered-by").use((0, import_morgan.default)("dev")).use((0, import_body_parser.urlencoded)({ extended: true })).use((0, import_body_parser.json)()).use((0, import_cors.default)()).get(
    "/api/message/:name",
    (req, res) => res.json({ message: `hello ${req.params.name}` })
  ).get("/api/status", (_, res) => res.json({ status: "ok" }));
  return app;
};

// src/index.ts
import_dotenv.default.config();
var port = process.env.PORT || 5001;
var apiUrl = process.env.WEATHER_BASE_URL || "";
var apiKey = process.env.WEATHER_API_KEY || "";
var server = createServer();
server.listen(port, () => {
  (0, import_logger.log)(`api running on ${port}`);
});
server.get(
  "/api/weather",
  async (req, res) => {
    var _a, _b;
    const { city, latitude, longitude } = req.query;
    if (!city && (!latitude || !longitude)) {
      return res.status(400).json({
        error: {
          message: "Either city or both latitude and longitude must be provided",
          code: 400
        }
      });
    }
    const query = city ? city : `${latitude},${longitude}`;
    try {
      const response = await import_axios.default.get(
        `${apiUrl}/current.json?key=${apiKey}&q=${query}`
      );
      res.json(response.data);
    } catch (error) {
      const axiosError = error;
      const errorResponse = {
        message: axiosError.message || "Failed to fetch weather data",
        code: (_a = axiosError.response) == null ? void 0 : _a.status
      };
      res.status(((_b = axiosError.response) == null ? void 0 : _b.status) || 500).json({ error: errorResponse });
    }
  }
);
server.get(
  "/api/search",
  async (req, res) => {
    var _a, _b;
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        error: {
          message: "Search query is required",
          code: 400
        }
      });
    }
    try {
      const response = await import_axios.default.get(
        `${apiUrl}/search.json?key=${apiKey}&q=${query}`
      );
      res.json(response.data);
    } catch (error) {
      const axiosError = error;
      const errorResponse = {
        message: axiosError.message || "Failed to fetch search results",
        code: (_a = axiosError.response) == null ? void 0 : _a.status
      };
      res.status(((_b = axiosError.response) == null ? void 0 : _b.status) || 500).json({ error: errorResponse });
    }
  }
);
