import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import gameRoutes from "./routes/game.routes";
import balanceRoutes from "./routes/balance.routes";
import historyRoutes from "./routes/history.routes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/balance", balanceRoutes);
app.use("/api/history", historyRoutes);

export default app;
