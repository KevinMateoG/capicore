import express from "express";
import cors from "cors";
import { Pool } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

// --- DASHBOARD ---
app.get("/api/dashboard", async (_req, res) => {
  try {
    const [container, stats, breakdown, weekly] = await Promise.all([
      pool.query("SELECT * FROM main_container ORDER BY id DESC LIMIT 1"),
      pool.query("SELECT * FROM monthly_stats ORDER BY month DESC LIMIT 1"),
      pool.query("SELECT * FROM recycling_breakdown WHERE month = DATE_TRUNC('month', NOW()) ORDER BY id"),
      pool.query("SELECT date, kg FROM weekly_waste WHERE date >= CURRENT_DATE - 6 ORDER BY date ASC"),
    ]);
    res.json({
      container: container.rows[0],
      stats: stats.rows[0],
      breakdown: breakdown.rows,
      weekly: weekly.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SENSORES ---
app.get("/api/sensors", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sensors ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/sensors/:id", async (req, res) => {
  const { id } = req.params;
  const { level, status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE sensors SET level=$1, status=$2, updated_at=NOW() WHERE id=$3 RETURNING *",
      [level, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- COMPOST ---
app.get("/api/compost", async (_req, res) => {
  try {
    const [compost, participants] = await Promise.all([
      pool.query("SELECT * FROM compost ORDER BY id DESC LIMIT 1"),
      pool.query(
        "SELECT * FROM participants WHERE month = DATE_TRUNC('month', NOW()) ORDER BY kg_contributed DESC"
      ),
    ]);
    res.json({
      compost: compost.rows[0],
      participants: participants.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});