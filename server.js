const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

// Serve static files with clean URL support (matching vercel.json cleanUrls: true)
app.use(
  express.static(__dirname, {
    extensions: ["html"],
    index: "index.html",
  })
);

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Enigma Ciencia server listening on http://${HOST}:${PORT}`);
});
