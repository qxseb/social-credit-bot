import { ButtonInteraction } from "discord.js";

export const data = {
  name: "noob-button",
  execute: async (interaction: ButtonInteraction) => {
    interaction.update({ components: [] });
  },
};
