const { setBot: setBotFromInventory, sayItems, tossItem, equipItem, unequipItem, useEquippedItem } = require('./Inventory');
const { setBot: setBotFromCraft, craftItem } = require('./Craft');
const mineflayer = require("mineflayer");

const bot = mineflayer.createBot({
  host: "localhost",
  port: "00000",
  username: "Mineflayer_Bot",
  version: "1.12.2"
});

setBotFromInventory(bot);
setBotFromCraft(bot);

bot.on('spawn', function() {
  bot.chat("I'm alive");
});

bot.on('message', function(message) {
  console.log(message.toAnsi());
});

bot.on('chat', async (username, message) => {
  if (username === bot.username) return;
  const command = message.split(' ');
  switch (true) {
    case /^list$/.test(message):
      sayItems();
      break;
    case /^toss \d+ \w+$/.test(message):
      tossItem(command[2], command[1]);
      break;
    case /^toss \w+$/.test(message):
      tossItem(command[1]);
      break;
    case /^equip [\w-]+ \w+$/.test(message):
      equipItem(command[2], command[1]);
      break;
    case /^unequip \w+$/.test(message):
      unequipItem(command[1]);
      break;
    case /^use$/.test(message):
      useEquippedItem();
      break;
    case /^craft \d+ \w+$/.test(message):
      craftItem(command[2], command[1]);
      break;
  }
});