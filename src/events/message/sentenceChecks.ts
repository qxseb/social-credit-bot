import { Message, MessageEmbed } from "discord.js";
import { client } from "../..";
import creditSchema from "../../schemas/creditSchema";

import { wordsArray } from "../../words";

export const data = {
  name: "messageCreate",
  callback: async (message: Message) => {
    if (message.author.bot || message.channel === null) return;

    let { createdTimestamp: msgCreated } = message;

    let creditProfile = await creditSchema.findOne({ userId: message.member!.id });
    if (!creditProfile) {
      creditProfile = new creditSchema({ userId: message.member!.id });
    }

    // mentions
    if (message.content.startsWith(`<@!${client.user!.id}>`)) {
      message.reply({
        embeds: [
          new MessageEmbed({
            title: `WOW!`,
            description: `-25 social credit just because you pinged me!`,
            color: "RED",
          }),
        ],
      });

      let credit = parseInt(creditProfile?.credit as string) - 25;

      creditProfile!.credit = credit.toString();
      await creditProfile?.save();

      return;
    }

    // bad words
    wordsArray.bad_words.forEach(async (e) => {
      if (
        e === message.content.toLowerCase() ||
        message.content.toLowerCase().includes(e)
      ) {
        let credit = parseInt(creditProfile?.credit as string) - 25;

        creditProfile!.credit = credit.toString();
        await creditProfile?.save();

        message.reply({
          embeds: [
            new MessageEmbed({
              title: `NO!`,
              description: `-25 social credit because of what you just said! I can't believe it..`,
              color: "RED",
            }),
          ],
        });

        return;
      }
    });

    // check cooldown for good words
    let cooldown = 337;
    let created = Math.floor(msgCreated / 1000);
    let lastChecked = parseInt(creditProfile.lastChecked as string);

    if (lastChecked > created) return;

    wordsArray.good_words.forEach(async (e) => {
      if (
        e === message.content.toLowerCase() ||
        message.content.toLowerCase().includes(e)
      ) {
        let credit = parseInt(creditProfile?.credit as string) + 10;

        creditProfile!.credit = credit.toString();
        creditProfile!.lastChecked = (created + cooldown).toString();
        await creditProfile?.save();

        message.reply({
          embeds: [
            new MessageEmbed({
              title: `NICE!`,
              description: `+10 social credit because of the wise word(s) you said!`,
              color: "GREEN",
            }),
          ],
        });

        return;
      }
    });
  },
};
