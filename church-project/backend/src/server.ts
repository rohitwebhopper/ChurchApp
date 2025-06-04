import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "@/config/core";
import webRoutes from "@/routes/web";
import appRoutes from "@/routes/app";
import path from "path";

const app = express();
const prisma = new PrismaClient();

app.use(cors);
app.use(express.json());
app.use(
  "/src/uploads",
  express.static(path.join(__dirname, "..", "src", "uploads"))
);

app.use("/api/web", webRoutes);
app.use("/api/app", appRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
