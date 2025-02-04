import { z } from "zod";
import { onboardingSchema } from "../../schema";

export const onboardingUsernameSchema = onboardingSchema.pick({
  username: true,
  terms: true,
});

export type OnboardingUsernameSchema = z.infer<typeof onboardingUsernameSchema>;
