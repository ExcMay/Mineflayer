module.exports = {craftItem, setBot};

let bot;

function setBot(b) {
  bot = b;
}


async function craftItem(name, amount) {
    amount = parseInt(amount, 10);
    const item = bot.registry.itemsByName[name];
    const craftingTableID = bot.registry.blocksByName.crafting_table.id;
  
    const craftingTable = bot.findBlock({
      matching: craftingTableID
    });
  
    if (item) {
      const recipe = bot.recipesFor(item.id, null, 1, craftingTable)[0];
      if (recipe) {
        bot.chat(`I can make ${name}`);
        try {
          await bot.craft(recipe, amount, craftingTable);
          bot.chat(`Did the recipe for ${name} ${amount} times`);
        } catch (err) {
          bot.chat(`Error making ${name}`);
        }
      } else {
        bot.chat(`I cann't ${name}`);
      }
    } else {
      bot.chat(`Unknown item: ${name}`);
    }
  }
  