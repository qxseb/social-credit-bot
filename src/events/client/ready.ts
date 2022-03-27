import { Client } from "discord.js";
import mongoose from "mongoose";

export const data = {
  name: "ready",
  once: true,
  callback: async (client: Client) => {
    // handle discord
    console.log(`Successfully logged in as (${client.user?.tag})`);
    setInterval(() => {
      client.user?.setActivity({
        name: `${client.guilds.cache.size} guilds`,
        type: "WATCHING",
      });
    }, 60 * 1000);

    // handle mongodb
    async function handleMongoDB() {
      if (!process.env.MONGO_DB_TOKEN) return console.log("[DB] Not connected!");

      mongoose
        .connect(process.env.MONGO_DB_TOKEN)
        .then(() => console.log("[DB] Connected!"))
        .catch((e) => console.log("[DB] Error", e));
    }

    await handleMongoDB();
  },
};
