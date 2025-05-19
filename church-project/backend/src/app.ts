import "dotenv/config";
import express from "express";
import { connectDB } from "./db/connection";
// import userRoutes from "./routes/userRoutes";

const app = express();

connectDB();

app.use(express.json());

// app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
