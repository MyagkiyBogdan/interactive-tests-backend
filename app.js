import express from "express";
import usersRouter from "./routes/user.routes.js";
import testRouter from "./routes/tests.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/tests", testRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

export default app;
