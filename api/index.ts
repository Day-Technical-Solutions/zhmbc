/** @format */

import express, {Request, Response, NextFunction} from "express";

const app = express();

app.disable("x-powered-by");
app.use(express.json({limit: "1mb"}));

app.get("/api/health", (_req: Request, res: Response) => {
	res.status(200).json({ok: true, env: process.env.VERCEL ? "vercel" : "local"});
});

app.post("/api/echo", (req: Request, res: Response) => {
	res.status(200).json({you_sent: req.body ?? null});
});

app.use("/api", (_req: Request, res: Response) => {
	res.status(404).json({error: "Not found"});
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err);
	res
		.status(typeof err?.status === "number" ? err.status : 500)
		.json({error: err?.message || "Internal Server Error"});
});

export default app;

if (!process.env.VERCEL) {
	const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
	app.listen(port, () => {
		console.log(`> Local API ready on http://localhost:${port}/api/health`);
	});
}
