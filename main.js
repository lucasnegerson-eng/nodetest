const mineflayer = require("mineflayer");
const express = require("express");

// =====================
// Minecraft Bot Setup
// =====================
const SERVER = {
    host: "45.90.13.64", // Your server IP
    port: 10710, // Your server port
    username: "615b", // Microsoft account email
    auth: "microsoft", // Microsoft auth
    version: "1.20.1", // Match server version
};

function joinServer() {
    const bot = mineflayer.createBot(SERVER);

    bot.on("login", () => {
        console.log("Bot logged in!");
    });

    bot.on("end", () => {
        console.log("Bot disconnected.");
    });

    bot.on("error", (err) => {
        console.log("Error:", err);
    });

    // Leave after 15 seconds
    setTimeout(() => bot.quit(), 15 * 1000);
}

// Join immediately, then every 4 minutes
joinServer();
setInterval(joinServer, 4 * 60 * 1000);

// =====================
// Express Server Setup
// =====================
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Minecraft keepalive bot is running!");
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

// Optional: catch uncaught exceptions so Replit doesn't crash
process.on("uncaughtException", (err) => {
    console.log("Uncaught exception:", err);
});
