import { model, Schema } from "mongoose";
import { ConfigSchemaProp } from "../utils/types";

export default model(
  "config",
  new Schema<ConfigSchemaProp>({
    guildId: String,
    roleId: String,
  })
);
