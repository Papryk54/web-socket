const express = require("express");
const path = require("path");
const socket = require("socket.io");
const app = express();
const PORT = 8000;
const server = app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
const io = socket(server);
const messages = [];
const users = [];

io.on("connection", (socket) => {
	console.log("New client! Its id – " + socket.id);

	socket.on("login", (user) => {
		console.log("User logged in:", user.name);
		users.push({ id: socket.id, name: user.name });
		socket.broadcast.emit("message", {
			author: "Chat Bot",
			content: `${user.name} has joined the conversation!`,
		});
	});

	socket.on("message", (message) => {
		console.log("Oh, I've got something from " + socket.id);
		messages.push(message);
		socket.broadcast.emit("message", message);
	});

	socket.on("disconnect", () => {
		console.log("Oh, socket " + socket.id + " has left");
		const index = users.findIndex((user) => user.id === socket.id);
		const user = users[index];
		if (index !== -1) {
			users.splice(index, 1);
		}
		socket.broadcast.emit("message", {
			author: "Chat Bot",
			content: `${user.name} has left the conversation... :(`,
		});
	});

	console.log(
		"I've added a listener on login, message and disconnect events \n"
	);
});

app.use(express.static(path.join(__dirname, "client")));
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "index.html"));
});
