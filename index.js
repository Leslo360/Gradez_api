import express from "express";
import studentRoutes from "./routes/students.js";
import adminRoutes from "./routes/admin.js";

const PORT = 3600;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});
app.use("/students", studentRoutes);
app.use("/administrator", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to Gradez Rest API");
});
