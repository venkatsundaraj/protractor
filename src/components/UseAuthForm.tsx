"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  EmailValidatorSchema,
  emailValidator,
} from "@/utils/validations/emailValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

interface pageProps {}

const UseAuthForm: FC<pageProps> = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmailValidatorSchema>({
    resolver: zodResolver(emailValidator),
  });

  const searchParams = useSearchParams();

  const onSubmit = async function (data: EmailValidatorSchema) {
    try {
      const result = await signIn("email", {
        email: data.email.toLowerCase(),
        redirect: false,
        callbackUrl: searchParams?.get("from") || "/dashboard",
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      reset();
    }
  };
  return (
    <section className="flex items-center justify-center min-h-screen w-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-between flex-col gap-4 p-4 max-w-md border-slate-50 rounded-md"
      >
        <Input
          disabled={isSubmitting}
          {...register("email")}
          type="email"
          placeholder="Email"
        />
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </section>
  );
};

export default UseAuthForm;
