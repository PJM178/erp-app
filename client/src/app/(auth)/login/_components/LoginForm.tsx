"use client"

import { InputField } from "@/components/Inputs";
import styles from "./LoginForm.module.css";
import { Button } from "@/components/Buttons";
import { useState } from "react";
import { LoginUser, loginUserSchema } from "@/schemas/user.schema";
import { ErrorMessage } from "@/components/UiNotifications";

// TODO: use server actions where necessary - usually mutations can be server actions while GET 
// method actions should be client functions using React Query, for example, for easier caching
// Correction: actually, with separate backend, server actions and server fetching may not be
// desirable since next.js is hosted too, and it may incur egress fees when making server calls
// as opposed to just let client handle the logic. Bundles js size and processing is probably
// also inconsequential.
const LoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginUser> | null>({
    username: undefined,
    password: undefined,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = loginUserSchema.safeParse(form);
    console.log(validationResult.error);
    console.log(validationResult.data);
    if (!validationResult.success) {
      console.log(validationResult.error.format());
      const formattedErrors = validationResult.error.format();
      console.log(formattedErrors);
      const thing = Object.fromEntries(Object.entries(formattedErrors).filter(([k]) => k !== "_errors").map(([k, v]) => [k, (v as { _errors: string[] })?._errors[0]]));

      console.log(thing);
      setErrors(thing);
    } else {
      setErrors(null);
    }
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles["form-inputs--container"]}>
        <div className={styles["input--container"]}>
          <ErrorMessage
            color="error"
            enabled={!!errors?.username}
          >
            {errors?.username}
          </ErrorMessage>
          <label htmlFor="username">Username</label>
          <InputField
            value={form.username}
            onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))}
            inputType="outlined"
            name="username"
            id="username"
          />
        </div>
        <div className={styles["input--container"]}>
          <ErrorMessage
            color="error"
            enabled={!!errors?.password}
          >
            {errors?.password}
          </ErrorMessage>
          <label htmlFor="password">Password</label>
          <InputField
            value={form.password}
            onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
            inputType="outlined"
            name="password"
            id="password"
            type="password"
          />
        </div>
      </div>
      <Button
        buttonType="type"
      >
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;