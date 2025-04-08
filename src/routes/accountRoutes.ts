import express from "express";
import { Request, Response } from "express";
import pool from "../config/database";

const router = express.Router();

// Obtener todas las cuentas de un usuario
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT a.*, fi.name as institution_name, fi.type as institution_type
      FROM accounts a
      JOIN financial_institutions fi ON a.institution_id = fi.id
      WHERE a.user_id = ?
    `,
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener cuentas del usuario", error });
  }
});

// Crear una nueva cuenta
router.post("/", async (req: Request, res: Response) => {
  const { user_id, institution_id, account_type, account_number } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO accounts (user_id, institution_id, account_type, account_number) VALUES (?, ?, ?, ?)",
      [user_id, institution_id, account_type, account_number]
    );
    res
      .status(201)
      .json({ message: "Cuenta creada exitosamente", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error al crear cuenta", error });
  }
});

// Actualizar una cuenta
router.put("/:id", async (req: Request, res: Response) => {
  const { account_type, account_number } = req.body;
  try {
    await pool.query(
      "UPDATE accounts SET account_type = ?, account_number = ? WHERE id = ?",
      [account_type, account_number, req.params.id]
    );
    res.json({ message: "Cuenta actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cuenta", error });
  }
});

// Eliminar una cuenta
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await pool.query("DELETE FROM accounts WHERE id = ?", [req.params.id]);
    res.json({ message: "Cuenta eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cuenta", error });
  }
});

export default router;
