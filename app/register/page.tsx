"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { CiMail } from 'react-icons/ci';
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const FormSchema = z.object({
  username: z.string({ required_error: "Поле обязательно для заполнения" }).email({ message: "Введите корректный адрес электронной почты" }).min(1, { message: "Введите адрес электронной почты" }),
  password: z.string({ required_error: "Поле обязательно для заполнения" }).regex(/^[a-zA-Z0-9~!@#$%^&*()\\-_=+{};:,<.>/?]*$/, { message: "Пароль должен содержать только латинские буквы, цифры или символы" }).min(8, { message: "Пароль должен состоять минимум из 8 символов" }).max(20, { message: "Пароль должен содержать не больше 20 символов" }),
});

const Page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      username: "",
    }
  })

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <div className="flex items-center justify-center w-full h-full gap-x-20">
      <div>
        <p className="text-sky-500 text-7xl font-extrabold">
          AirTeach
        </p>
      </div>
      <div className=" bg-white text-2xl w-96 p-5 rounded-xl">
        <p className="text-gray-600 font-bold text-base">
          Регистрация
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="text-gray-500">
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input className="rounded-xl shadow-lg pl-10" placeholder="Email" {...field} />
                      <CiMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-gray-500">
                  <FormLabel>Придумайте пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="rounded-xl shadow-lg pl-10"
                        placeholder="Пароль"
                        {...field}
                      />
                      {showPassword ? (
                        <BsEye
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <BsEyeSlash
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <Button type="submit" className=" text-gray-600 font-bold rounded-xl shadow-lg hover: bg-gray-100">Зарегистрироваться</Button>
          </form>
        </Form>
        <div className="flex flex-row text-base py-5 gap-x-3 text-gray-500">
          <p>
            Уже есть аккаунт?
          </p>
          <Link href="/" className="text-sky-500 font-bold hover:text-sky-600">
            Войдите
          </Link>
        </div>
      </div>
    </div>

  )
}

export default Page