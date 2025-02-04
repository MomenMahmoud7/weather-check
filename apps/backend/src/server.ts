import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/api/message/:name", (req, res) =>
      res.json({ message: `hello ${req.params.name}` })
    )
    .get("/api/status", (_, res) => res.json({ status: "ok" }));

  return app;
};
