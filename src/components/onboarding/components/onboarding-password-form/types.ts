import { z } from "zod";
import { onboardingSchema } from "../../schema";

export const onboardingPasswordSchema = onboardingSchema.pick({
  password: true,
  repeatPassword: true,
});

export type OnboardingPasswordSchema = z.infer<typeof onboardingPasswordSchema>;
