// variables
import { Client, Collection } from "discord.js";
import { handleButtons, handleCommands, handleEvents } from "./utils/handlers";
import { ClientWithCollections } from "./utils/types";
require("dotenv").config();

// define and export the client property
export const client: ClientWithCollections = new Client({ intents: 32767 });

// collections
client.commandsCollection = new Collection();
client.aliasesCollection = new Collection();
client.buttonsCollection = new Collection();

// run the handlers for events
handleEvents();
handleCommands();
handleButtons();

// login function
client.login(process.env.DISCORD_BOT_TOKEN);
