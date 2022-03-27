import { Client } from "discord.js";

export const data = {
  name: "ready",
  once: true,
  callback: (client: Client) => {
    process.on("unhandledRejection", (reason, p) => {
      console.log("UNHANDLED REJECTION ERROR: ", reason);
    });

    process.on("uncaughtException", (err, origin) => {
      console.log("UNHANDLED EXCEPTION ERROR: ", err, origin);
    });
    process.on("uncaughtExceptionMonitor", (err, origin) => {
      console.log("UNHANDLED EXCEPTION ERROR: ", err);
    });
    process.on("multipleResolves", (type, promise, reason) => {
      console.log("MULTIPLE RESOLVES ERROR: ", type, promise, reason);
    });
  },
};
