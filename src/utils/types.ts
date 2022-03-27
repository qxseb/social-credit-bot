import { Client } from "discord.js";

export type ClientWithCollections = Client & {
  commandsCollection?: any;
  aliasesCollection?: any;
  buttonsCollection?: any;
};

export type CreditSchemaProp = {
  userId?: String;
  credit?: String;
  lastChecked?: String;
};
