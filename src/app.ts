import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createDatabases } from "./lib";

import type { Express } from "express";
import { loansRoutes } from "./routes";

class Application {
  public server: Express;

  public constructor() {
    this.server = express();

    this.middleware();
    this.routes();
    this.createDefaultDatabaseSettings();
  }

  private middleware(): void {
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: "*",
      })
    );
    this.server.use(morgan("tiny"));
  }

  private async createDefaultDatabaseSettings() {
    await createDatabases();
  }

  private routes(): void {
    this.server.use(loansRoutes);
  }
}

const app = new Application();

export { app };
