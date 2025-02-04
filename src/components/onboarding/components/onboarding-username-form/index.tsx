"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingStore } from "@/store/onboarding";
import { onboardingUsernameSchema, OnboardingUsernameSchema } from "./types";

export default function OnboardingUsernameForm() {
  const router = useRouter();
  const firstName = useOnboardingStore((state) => state.firstName);
  const lastName = useOnboardingStore((state) => state.lastName);
  const password = useOnboardingStore((state) => state.password);
  const repeatPassword = useOnboardingStore((state) => state.repeatPassword);

  const form = useForm<OnboardingUsernameSchema>({
    resolver: zodResolver(onboardingUsernameSchema),
    defaultValues: {
      username: "",
      terms: false,
    },
  });

  const handleChangeCheckbox = (e: any) => {
    form.setValue("terms", e.target.checked);
  };

  const onSubmit = (data: OnboardingUsernameSchema) => {
    console.log({
      ...data,
      firstName,
      lastName,
      password,
      repeatPassword,
    });
  };

  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated) return;

    if (!firstName || !lastName || !password || !repeatPassword) {
      router.push("/onboarding/name");
    }
  }, [
    useOnboardingStore.persist.hasHydrated,
    firstName,
    lastName,
    password,
    repeatPassword,
    router,
  ]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-[300px] space-y-8"
    >
      <div>
        <label>Username</label>
        <div>
          <input placeholder="John" />
        </div>
        <p>This is your username.</p>
      </div>

      <div>
        <input
          type="checkbox"
          checked={false}
          onChange={(e) => handleChangeCheckbox(e)}
        />
        <div>
          <p>I agree to the terms of service.</p>
        </div>
      </div>

      <button type="submit">Next</button>
    </form>
  );
}
