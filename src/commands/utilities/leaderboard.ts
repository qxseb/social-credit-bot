import { Client, Message, MessageEmbed } from "discord.js";
import creditSchema from "../../schemas/creditSchema";

export const data = {
  config: {
    name: "leaderboard",
    description: "Check the guild's leaderboard",
    usage: `${process.env.DEFAULT_PREFIX}leaderboard`,
    permissions: "Member",
    aliases: ["lb"],
  },
  run: async (client: Client, message: Message, args: String) => {
    let models = await creditSchema.find({ guildId: message.guild!.id });
    let credits: any[] = [];

    models.forEach((e) => credits.push({ user: e.userId, credit: e.credit }));
    credits.sort(function (a, b) {
      return a.credit - b.credit;
    });
    credits.slice(0, 2);
    credits.reverse();

    let embed = new MessageEmbed()
      .setTitle(":flag_cn: Leaderboard")
      .setColor("RED")
      .setDescription(" ");

    credits.forEach((e, i) =>
      embed.setDescription(
        embed.description +
          ` **<@!${e.user}>**: \`${parseInt(e.credit).toLocaleString()}\` social credit\n`
      )
    );

    message.reply({ embeds: [embed] });
  },
};
