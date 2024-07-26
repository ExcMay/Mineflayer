module.exports = { setBot, sayItems, tossItem, equipItem, unequipItem, useEquippedItem };

let bot;

function setBot(b) {
  bot = b;
}

function sayItems(items = null) {
  if (!items) {
    items = bot.inventory.items();
    if (bot.registry.isNewerOrEqualTo('1.9') && bot.inventory.slots[45]) items.push(bot.inventory.slots[45]);
  }
  const output = items.map(itemToString).join(', ');
  if (output) {
    bot.chat(output);
  } else {
    bot.chat('Empty');
  }
}

async function tossItem(name, amount) {
  amount = parseInt(amount, 10);
  const item = itemByName(name);
  if (!item) {
    bot.chat(`I have no ${name}`);
  } else {
    try {
      if (amount) {
        await bot.toss(item.type, null, amount);
        bot.chat(`Tossed ${amount} ${name}`);
      } else {
        await bot.tossStack(item);
        bot.chat(`Tossed ${name}`);
      }
    } catch (err) {
      bot.chat(`Unable to toss: ${err.message}`);
    }
  }
}

async function equipItem(name, destination) {
  const item = itemByName(name);
  if (item) {
    try {
      await bot.equip(item, destination);
      bot.chat(`Equipped ${name}`);
    } catch (err) {
      bot.chat(`Cannot equip ${name}: ${err.message}`);
    }
  } else {
    bot.chat(`I have no ${name}`);
  }
}

async function unequipItem(destination) {
  try {
    await bot.unequip(destination);
    bot.chat('unequipped');
  } catch (err) {
    bot.chat(`cannot unequip: ${err.message}`);
  }
}

function useEquippedItem() {
  bot.chat('activating item');
  bot.activateItem();
}


function itemToString(item) {
  if (item) {
    return `${item.name} x ${item.count}`;
  } else {
    return '(nothing)';
  }
}

function itemByName(name) {
  const items = bot.inventory.items();
  if (bot.registry.isNewerOrEqualTo('1.9') && bot.inventory.slots[45]) items.push(bot.inventory.slots[45]);
  return items.filter(item => item.name === name)[0];
}
