import { Interaction } from "discord.js";
import { client } from "../..";

export const data = {
  name: "interactionCreate",
  callback: async (interaction: Interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId.endsWith("-verify")) return interaction.deferUpdate();

      const button = client.buttonsCollection.get(interaction.customId);
      if (!button)
        return await interaction.reply(
          `There was no button code found for ${interaction.customId}`
        );

      try {
        await button.data.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this button!",
          ephemeral: true,
        });
      }
    }
  },
};
