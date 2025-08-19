/** @format */

import express from "express";
const app = express();
app.get("/api/health", (_, res) => res.json({ok: true}));
export default app;
