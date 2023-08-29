import express from "express";
import logger from "morgan";
import cors from "cors";

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };

import authRouter from "./routes/api/authRouter.js";

import usersRouter from "./routes/api/usersRouter.js";

import boardsRouter from "./routes/api/boardsRouter.js";
import columnsRouter from "./routes/api/columnsRouter.js";
import cardsRouter from "./routes/api/cardsRouter.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/users", usersRouter);

app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


export default app;
