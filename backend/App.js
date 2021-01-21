import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { connectDatabase } from "./DBConfig.js";
import { userRoutes } from "./routes/userRoutes.js";
import { PostRoutes } from "./routes/productRoutes.js";
import cors from "cors";

// injects all the environment variables
dotenv.config();

// connects mongodb database
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/users", userRoutes);
app.use("/api/posts", PostRoutes);

// error handler middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// listner
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
