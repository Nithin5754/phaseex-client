"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { useState } from "react";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/
);

const FormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(8, { message: "First name cannot exceed 8 characters." })
    .regex(/^[a-zA-Z]*$/, {
      message: "Name can only contain letters.",
    }),

  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),

  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .regex(passwordValidation, {
      message: "Your password is not valid ",
    }),
  confirmPassword: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .regex(passwordValidation, {
      message: "Your password is not valid ",
    }),
});

const ProfileForm = () => {
  const [isConfirmPassMsg, setConfirmPassMsg] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.password !== data.confirmPassword) {
      setConfirmPassMsg("password not match");
      return;
    }

    setConfirmPassMsg("");
    console.log(data);
  }

  return (
  
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="eg: nithin joji" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="enter new password"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-[11px]">
                  ** should contain atleast one uppercase,one lower-case,one
                  number,one special character
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="enter confirm password"
                    {...field}
                  />
                </FormControl>

                <FormMessage> {isConfirmPassMsg}</FormMessage>
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Register
          </Button>
        </form>
      </Form>
  
  );
};
export default ProfileForm;
