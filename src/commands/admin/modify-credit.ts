import { Client, Message, MessageEmbed } from "discord.js";
import configSchema from "../../schemas/configSchema";
import creditSchema from "../../schemas/creditSchema";

export const data = {
  config: {
    name: "modify-credit",
    description: "!",
    usage: `${process.env.DEFAULT_PREFIX}modify-credit <user> <amount>`,
    permissions: "Owner",
    aliases: ["change-credit"],
  },
  run: async (client: Client, message: Message, args: any) => {
    let errorEmbed = new MessageEmbed()
      .setColor("RED")
      .setTitle(":flag_cn: Error Moment");

    let configProfile = await configSchema.findOne({ guildId: message.guild!.id });
    if (!configProfile)
      return message.reply({
        embeds: [
          errorEmbed.setDescription(
            "The bot's administrator role is not configured! Run `!config` to be able to use this command!"
          ),
        ],
      });

    if (!message.member?.roles.cache.find((e) => e.id == configProfile?.roleId))
      return message.reply({
        embeds: [
          errorEmbed.setDescription(
            `Only members that have the bot's administrator role (<@&${configProfile.roleId}>) are allowed to run this command!`
          ),
        ],
      });

    let mentioned = message.mentions.members?.first();
    let amount = args[1];

    if (!mentioned)
      return message.reply({
        embeds: [errorEmbed.setDescription("You need to mention an actual person")],
      });

    if (!amount)
      return message.reply({
        embeds: [
          errorEmbed.setDescription(
            "I think you forgot to provide the amount of credits you want to modify, smh"
          ),
        ],
      });

    if (isNaN(amount))
      return message.reply({
        embeds: [errorEmbed.setDescription(`That is not a valid number, wtf you on`)],
      });

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
    let total = parseInt(creditProfile.credit! as string) + parseInt(amount);

    creditProfile.credit = total.toString();
    await creditProfile.save();

    let embedInfo = new MessageEmbed()
      .setAuthor({
        name: `${message.author.tag}`,
        iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
      })
      .setTitle(`:flag_cn: Stonks`)
      .setColor("RED")
      .setDescription(
        `${amount < 0 ? "Removed" : "Added"} \`${amount}\` social credits ${
          amount < 0 ? "from" : "to"
        } ${mentioned}. They now have ${parseInt(
          creditProfile.credit! as string
        ).toLocaleString()} social credits`
      );

    message.reply({ embeds: [embedInfo] });
  },
};
