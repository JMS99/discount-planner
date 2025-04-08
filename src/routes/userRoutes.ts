import express from "express";
import { Request, Response } from "express";
import pool from "../config/database";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, created_at FROM users"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
});

// Obtener un usuario por ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [req.params.id]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
});

// Crear un nuevo usuario
router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
});

export default router;
