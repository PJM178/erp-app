"use client"

import { InputField } from "@/components/Inputs";
import styles from "./LoginForm.module.css";
import { Button } from "@/components/Buttons";
import { useEffect, useState } from "react";
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
  const [errors, setErrors] = useState<Partial<LoginUser> | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = loginUserSchema.safeParse(form);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      const cleanedErrorObject = Object.fromEntries(
        Object.entries(formattedErrors)
          .filter(([k]) => k !== "_errors")
          .map(([k, v]) => [k, (v as { _errors: string[] })?._errors[0]])
      );

      setErrors(cleanedErrorObject);
    } else {
      setErrors(null);
      console.log("submit success here");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => {
      if (errors) {
        const key = e.target.name as keyof LoginUser;
        const fieldSchema = loginUserSchema.shape[key];
        const propertyValidationResult = fieldSchema.safeParse(e.target.value);

        if (propertyValidationResult.success) {
          setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
        } else {
          const formattedPropertyError = propertyValidationResult.error.format();

          setErrors(prev => ({ ...prev, [e.target.name]: formattedPropertyError._errors[0]}));
        }
      }

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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