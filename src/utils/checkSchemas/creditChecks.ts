import { GuildMember } from "discord.js";
import creditSchema from "../../schemas/creditSchema";

export async function checkCreditSchema(member: GuildMember) {
  let creditProfile = await creditSchema.findOne({ userId: member.user.id });

  if (creditProfile) return creditProfile;

  creditProfile = new creditSchema({
    userId: member.user.id,
  });
  await creditProfile
    .save()
    .catch((e) => console.log(`Error while saving credit schema:`, e));
}
