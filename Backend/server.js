import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import courseRoutes from "./routes/course.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//db connection
connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"))

app.get("/", (req, res) => {
  res.send("API is running");
});

//routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
