import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production, client/public in development
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "client", "public");

  app.use(express.static(staticPath));

  // Serve specific HTML files from myooredoo folder
  app.get("/myooredoo/:filename.html", (req, res) => {
    const filePath = path.join(staticPath, "myooredoo", `${req.params.filename}.html`);
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).sendFile(path.join(staticPath, "index.html"));
      }
    });
  });

  // Serve myooredoo index.html at /myooredoo/ route
  app.get("/myooredoo/", (_req, res) => {
    res.sendFile(path.join(staticPath, "myooredoo", "index.html"));
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
