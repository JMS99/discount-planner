import express from "express";
import { Request, Response } from "express";
import pool from "../config/database";

const router = express.Router();

// Obtener todos los descuentos
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.*, fi.name as institution_name 
      FROM discounts d
      JOIN financial_institutions fi ON d.institution_id = fi.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener descuentos", error });
  }
});

// Obtener descuentos por categoría
router.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT d.*, fi.name as institution_name 
      FROM discounts d
      JOIN financial_institutions fi ON d.institution_id = fi.id
      WHERE d.category = ?
    `,
      [req.params.category]
    );
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener descuentos por categoría", error });
  }
});

// Obtener descuentos por día de la semana
router.get("/day/:dayOfWeek", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT d.*, fi.name as institution_name 
      FROM discounts d
      JOIN financial_institutions fi ON d.institution_id = fi.id
      WHERE d.day_of_week = ?
    `,
      [req.params.dayOfWeek]
    );
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener descuentos por día", error });
  }
});

// Obtener descuentos activos para un usuario
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT d.*, fi.name as institution_name, a.account_type
      FROM user_discounts ud
      JOIN discounts d ON ud.discount_id = d.id
      JOIN financial_institutions fi ON d.institution_id = fi.id
      JOIN accounts a ON ud.account_id = a.id
      WHERE ud.user_id = ? AND ud.is_active = true
    `,
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener descuentos del usuario", error });
  }
});

export default router;
