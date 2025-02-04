"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingStore } from "@/store/onboarding";
import { onboardingPasswordSchema, OnboardingPasswordSchema } from "./types";

export default function OnboardingPasswordForm() {
  const router = useRouter();

  const firstName = useOnboardingStore((state) => state.firstName);
  const lastName = useOnboardingStore((state) => state.lastName);

  const setData = useOnboardingStore((state) => state.setData);

  const form = useForm<OnboardingPasswordSchema>({
    resolver: zodResolver(onboardingPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = (data: OnboardingPasswordSchema) => {
    setData(data);
    router.push("/onboarding/username");
  };

  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated) return;

    if (!firstName || !lastName) {
      router.push("/onboarding/name");
    }
  }, [useOnboardingStore.persist.hasHydrated, firstName, lastName, router]);

  return (
    <form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label>Password</label>
        <div>
          <input placeholder="********" type="password" />
        </div>
        <p>This is your password.</p>
      </div>

      <div>
        <label>Confirm Password</label>
        <div>
          <input placeholder="********" type="password" />
        </div>
        <p>This is your password confirmation.</p>
      </div>

      <button type="submit">Next</button>
    </form>
  );
}
