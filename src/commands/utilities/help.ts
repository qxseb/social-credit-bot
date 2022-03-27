import { Client, Message, MessageEmbed } from "discord.js";
import { ClientWithCollections } from "../../utils/types";

type configsProps = {
  name: String;
  description: String;
  usage: String;
  permissions: String;
  aliases: String[];
};

export const data = {
  config: {
    name: "help",
    description: "Help command",
    usage: `${process.env.DEFAULT_PREFIX}help`,
    accesableby: "Member",
    aliases: [],
  },
  run: (client: ClientWithCollections, message: Message, args: String) => {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    if (!helpArgs[0]) {
      message.reply(":pensive:");
    }

    if (helpArgs[0]) {
      let command = helpArgs[0];

      if (client.commandsCollection.has(command)) {
        let cmd = client.commandsCollection.get(command);
        let configs: configsProps = cmd.data.config;

        let helpEmbed = new MessageEmbed()
          .setTitle("Command Information")
          .setColor("RED")
          .addField(`Name`, `${configs.name}`, true)
          .addField(`Usage`, `${configs.usage || "No Usage"}`, true)
          .addField(`Permissions`, `${configs.permissions || "Members"}`, true)
          .addField(
            `Aliases`,
            `${
              configs.aliases.length >= 1 ? `${configs.aliases.join(", ")}` : "No Aliases"
            }`,
            true
          )
          .addField(
            `Description`,
            `${configs.description || "There is no description for this command"}`,
            true
          );

        message.reply({ embeds: [helpEmbed] });
      }
    }
  },
};
