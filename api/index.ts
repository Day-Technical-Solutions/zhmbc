/** @format */

// api/index.ts
import express, {Request, Response, NextFunction} from "express";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

// Example routes
app.get("/api/health", (_req: Request, res: Response) => {
	res.json({ok: true});
});

app.post("/api/echo", (req: Request, res: Response) => {
	res.json({youSent: req.body});
});

// 404 for /api/*
app.use("/api", (_req, res) => res.status(404).json({error: "Not found"}));

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err);
	res.status(err?.status || 500).json({error: err?.message || "Server error"});
});

// Vercel expects a default export that is a (req, res) handler — an Express app works.
export default app;

// Local dev only: start a port if not on Vercel
if (!process.env.VERCEL) {
	const port = process.env.PORT ? Number(process.env.PORT) : 3000;
	app.listen(port, () => console.log(`API at http://localhost:${port}/api/health`));
}
