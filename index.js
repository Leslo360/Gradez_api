import express from "express";
import studentRoutes from "./routes/students.js";

const PORT = 3600;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to Gradez Rest API");
});
