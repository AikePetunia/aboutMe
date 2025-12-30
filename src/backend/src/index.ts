import express from "express";
import "./loadEnv";
import cookieParser from "cookie-parser";
import steamRouter from "./services/steam";
import malAuthRouter from "./services/MAL/auth";
import malAnimeRouter from "./services/MAL/anime";

const app = express();
const port = Number(process.env.PORT) || 4000;

// Parse JSON bodies and accept cookies
app.use(express.json());
app.use(cookieParser());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api/steam", steamRouter);
app.use("/api/mal", malAuthRouter);
app.use("/api/mal", malAnimeRouter);

app.get("/", (_, res) => res.json({ ok: true }));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});