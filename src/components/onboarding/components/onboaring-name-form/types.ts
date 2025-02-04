import { z } from "zod";
import { onboardingSchema } from "../../schema";

export const onboardingNameSchema = onboardingSchema.pick({
  firstName: true,
  lastName: true,
});

export type OnboardingNameSchema = z.infer<typeof onboardingNameSchema>;