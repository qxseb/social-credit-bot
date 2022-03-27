import { Client, Message, MessageEmbed } from "discord.js";
import creditSchema from "../../schemas/creditSchema";

export const data = {
  config: {
    name: "credit",
    description: "Check your credit!",
    usage: `${process.env.DEFAULT_PREFIX}credit <user?>`,
    permissions: "Member",
    aliases: ["balance", "social-credit"],
  },
  run: async (client: Client, message: Message, args: String) => {
    let mentioned = message.mentions.members?.first();

    if (mentioned) {
      let creditProfile = await creditSchema.findOne({
        userId: mentioned.user.id,
        guildId: message.guild!.id,
      });
      if (!creditProfile) {
        creditProfile = new creditSchema({
          userId: mentioned.user.id,
          guildId: message.guild!.id,
        });
      }
      let embedInfo = new MessageEmbed()
        .setAuthor({
          name: `${message.author.tag}`,
          iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
        })
        .setTitle(`:flag_cn: Social Credit`)
        .setColor("RED")
        .setThumbnail(
          "https://imgs.search.brave.com/VTC7WQAVGKSXVwDRqV3ltEDFhpa1drBHRaxCjPNG8ds/rs:fit:817:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5B/bGp0Y2YxY0EyNlht/S1JjRklxYzNnSGFF/VCZwaWQ9QXBp"
        )
        .setDescription(
          `**${mentioned.user.tag}** currently has ${parseInt(
            creditProfile.credit! as string
          ).toLocaleString()} social credit.`
        );

      message.reply({ embeds: [embedInfo] });
    } else {
      let creditProfile = await creditSchema.findOne({ userId: message.member!.id });
      if (!creditProfile) {
        creditProfile = new creditSchema({ userId: message.member!.id });
      }
      let embedInfo = new MessageEmbed()
        .setAuthor({
          name: `${message.author.tag}`,
          iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
        })
        .setTitle(`:flag_cn: Social Credit`)
        .setColor("RED")
        .setThumbnail(
          "https://imgs.search.brave.com/VTC7WQAVGKSXVwDRqV3ltEDFhpa1drBHRaxCjPNG8ds/rs:fit:817:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5B/bGp0Y2YxY0EyNlht/S1JjRklxYzNnSGFF/VCZwaWQ9QXBp"
        )
        .setDescription(
          `You currently have ${parseInt(
            creditProfile.credit! as string
          ).toLocaleString()} social credit.`
        );

      message.reply({ embeds: [embedInfo] });
    }
  },
};
