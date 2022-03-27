import { model, Schema } from "mongoose";
import { CreditSchemaProp } from "../utils/types";

export default model(
  "credit",
  new Schema<CreditSchemaProp>({
    userId: String,
    guildId: String,
    credit: { type: String, default: "0" },
    lastChecked: { type: String, default: "0" },
  })
);
