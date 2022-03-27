import fs from "fs";
import { client } from "..";

export async function handleEvents() {
  try {
    let eventsMainFolder = fs.readdirSync("./src/events");
    for (const eventFolder of eventsMainFolder) {
      let eventFiles = fs
        .readdirSync(`./src/events/${eventFolder}`)
        .filter((file) => file.endsWith(".ts"));

      for (const file of eventFiles) {
        let event = require(`../events/${eventFolder}/${file}`);

        if (event.data.once) {
          client.once(event.data.name, (...args) => event.data.callback(...args, client));
        } else {
          client.on(event.data.name, (...args) => event.data.callback(...args, client));
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function handleCommands() {
  try {
    let commandsMainFolder = fs.readdirSync("./src/commands");
    for (const commandFolder of commandsMainFolder) {
      let commandFiles = fs
        .readdirSync(`./src/commands/${commandFolder}`)
        .filter((file) => file.endsWith(".ts"));

      if (commandFiles.length <= 0)
        return console.log(`[LOGS] Couldn't find commands in ${commandFolder}`);

      for (const file of commandFiles) {
        let command = require(`../commands/${commandFolder}/${file}`);
        client.commandsCollection.set(command.data.config.name, command);

        command.data.config.aliases.forEach((alias: any) =>
          client.aliasesCollection.set(alias, command.data.config.name)
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function handleButtons() {
  const buttonFolders = fs.readdirSync("./src/buttons");
  for (const folder of buttonFolders) {
    const buttonFiles = fs
      .readdirSync(`./src/buttons/${folder}`)
      .filter((file) => file.endsWith(".ts"));
    for (const file of buttonFiles) {
      const button = require(`../buttons/${folder}/${file}`);
      client.buttonsCollection.set(button.data.name, button);
    }
  }
}
