"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingStore } from "@/store/onboarding";
import { onboardingNameSchema, OnboardingNameSchema } from "./types";

export default function OnboardingNameForm() {
  const router = useRouter();

  const setData = useOnboardingStore((state) => state.setData);

  const { handleSubmit } = useForm<OnboardingNameSchema>({
    resolver: zodResolver(onboardingNameSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: OnboardingNameSchema) => {
    setData(data);
    router.push("/onboarding/password");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <div>
          <input placeholder="John" />
        </div>
        <p>This is your first name.</p>
      </div>

      <div>
        <label>Last Name</label>
        <div>
          <input placeholder="Doe" />
        </div>
        <p>This is your last name.</p>
      </div>
      <button type="submit">Next</button>
    </form>
  );
}
