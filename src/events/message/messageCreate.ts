import { Message, MessageEmbed } from "discord.js";
import { client } from "../..";

export const data = {
  name: "messageCreate",
  callback: (message: Message) => {
    if (message.author.bot || message.channel === null) return;

    let prefix = process.env.DEFAULT_PREFIX;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = message.content.slice(prefix!.length).trim().split(/ +/g);
    args.shift();

    if (!message.content.startsWith(prefix!)) return;
    let commandFile =
      client.commandsCollection.get(cmd.slice(prefix?.length)) ||
      client.commandsCollection.get(
        client.aliasesCollection.get(cmd.slice(prefix?.length))
      );
    if (commandFile) commandFile.data.run(client, message, args);
  },
};
