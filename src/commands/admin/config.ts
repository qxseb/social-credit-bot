import { Client, Message, MessageEmbed } from "discord.js";
import configSchema from "../../schemas/configSchema";

export const data = {
  config: {
    name: "config",
    description: "!",
    usage: `${process.env.DEFAULT_PREFIX}config`,
    permissions: "Administrator",
    aliases: ["setup"],
  },
  run: async (client: Client, message: Message, args: any) => {
    if (!message.member?.permissions.has("ADMINISTRATOR"))
      return message.reply({
        content: "This command is for guild administrators only!",
      });

    let req_perms = ["MANAGE_MESSAGES"];
    if (
      !message.guild?.members.cache
        .find((e) => e.id === client.user!.id)
        ?.permissions.has(["MANAGE_MESSAGES"])
    )
      return message.reply({
        content: `The bot doesn't have the following permissions: ${req_perms
          .map((e) => `\`${e}\``)
          .join(", ")}`,
      });

    let askRole = await message.reply({
      embeds: [
        new MessageEmbed({
          color: "RED",
          author: {
            name: `${message.author.tag}`,
            iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
          },
          description: "Provide the role that should be set as the bot's administrator!",
          title: `Bot's Administrator Role`,
          footer: { text: "Prompt expiring in 1 minute" },
        }),
      ],
    });

    let filter = (m: Message) => m.author.id === message.author.id;
    let collector = message.channel.createMessageCollector({
      filter,
      max: 1,
      time: 60 * 1000,
    });

    collector.on("collect", async (roleMsg: Message) => {
      if (!roleMsg.mentions.roles.first()) {
        roleMsg.reply({ content: "That is not a valid role!" });
        collector.stop();
        return;
      }

      let configProfile = await configSchema.findOne({ guildId: message.guild!.id });
      if (!configProfile) {
        configProfile = new configSchema({ guildId: message.guild!.id });
      }

      configProfile.roleId = roleMsg.mentions.roles.first()!.id;
      await configProfile.save();

      roleMsg.delete();

      askRole.embeds[0].title = "Configured";
      askRole.embeds[0].description = `Successfully configured the bot's administrator role to <@&${configProfile.roleId}>! See ya around!`;
      askRole.embeds[0].footer!.text = "";
      askRole.edit({ embeds: [askRole.embeds[0]] });
    });

    collector.on("end", (collected) => {
      if (collected.size <= 0) {
        askRole.embeds[0].title = "Time expired!";
        askRole.embeds[0].description = "";
        askRole.embeds[0].footer!.text = "";
        askRole.edit({ embeds: [askRole.embeds[0]] });
      }
    });
  },
};
