import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import discountRoutes from "./routes/discountRoutes";
import accountRoutes from "./routes/accountRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/accounts", accountRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Discount Planner" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
