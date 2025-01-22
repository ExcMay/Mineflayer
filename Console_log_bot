const mineflayer = require('mineflayer');
const path = require('path');
const os = require('os');
const fs = require('fs');
const bot = mineflayer.createBot({
    host: "localhost", // Set to "localhost" for local servers, or replace with a server IP
    port: 53827, // Change this to the correct port (default for Minecraft servers is 25565)
    username: "skinbot" // Bot's in-game username
});



/*
    Logs a message to the console and appends it to a file
    If the log file does not exist, it is created automatically
*/
const consolePath = path.join(__dirname,'Console.log.txt');
function console_log(message) {
    if (!fs.existsSync(consolePath)) {
        fs.writeFileSync(consolePath, '', 'utf8');
    };
    fs.appendFile(consolePath, message + os.EOL, (err) => {
        if (err) {console.error('Ошибка записи в лог:', err)}
    });
};



// Event listener for messages received in chat
bot.on ('message', (message) => {
    const logEntry = `[${new Date().toISOString().replace('T', ' ').split('.')[0]}] ${message}`
    console.log(logEntry)
    console_log(logEntry)
});
