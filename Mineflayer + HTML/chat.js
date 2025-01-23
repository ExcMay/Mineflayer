const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mineflayer = require('mineflayer');
const path = require('path');
const os = require('os');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const bot = mineflayer.createBot({
    host: "localhost", // Set to "localhost" for local servers, or replace with a server IP
    port: 56344, // Change this to the correct port (default for Minecraft servers is 25565)
    username: "skinbot" // Bot's in-game username
});



// Раздаём HTML и JS клиенту
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    // Receive a message from the browser and send a message to Minecraft Chat
    socket.on('chatMessage', (msg) => {
        bot.chat(msg);
    });
});


/*
    Logs a message to the console and appends it to a file
    If the log file does not exist, it is created automatically
*/
const consolePath = path.join(__dirname, 'Console.log.txt');
function console_log(message) {
    if (!fs.existsSync(consolePath)) {
        fs.writeFileSync(consolePath, '', 'utf8');
    };
    fs.appendFile(consolePath, message + os.EOL, (err) => {
        if (err) {console.error('Error in log entry:', err)}
    });
};



// Event listener for messages received in chat
bot.on ('message', (message) => {
    const logEntry = `[${new Date().toISOString().replace('T', ' ').split('.')[0]}] ${message}`
    console_log(logEntry)
});



const PORT = 1265; // You can change PORT 
server.listen(PORT, () => {
    console.log(`Server start http://localhost:${PORT}`);
});