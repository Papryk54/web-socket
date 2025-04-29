const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;

const messages = [];

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
