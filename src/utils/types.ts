import { Client } from "discord.js";

export type ClientWithCollections = Client & {
  commandsCollection?: any;
  aliasesCollection?: any;
  buttonsCollection?: any;
};

export type CreditSchemaProp = {
  userId?: String;
  guildId: String;
  credit?: String;
  lastChecked?: String;
};

export type ConfigSchemaProp = {
  guildId: String;
  roleId: String;
};
