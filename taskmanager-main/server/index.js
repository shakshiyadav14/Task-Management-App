import dotenv from "dotenv";
import path from "path";

// ✅ Load .env before anything else
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

// ✅ Ensure MongoDB URI exists
if (!process.env.MONGO_URI) {
  console.error("❌ MongoDB URI is missing. Check your .env file.");
  process.exit(1);
}

console.log("✅ MongoDB URI:", process.env.MONGO_URI);
console.log("✅ ENV Variables Loaded");

// ✅ Call database connection function
dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.us

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
