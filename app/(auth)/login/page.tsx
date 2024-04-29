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
import { login } from "@/http/user/userAPI";
import axios, { AxiosError } from "axios";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { makeAuth } from "@/lib/features/user/userSlice";
import { ErrorAlert } from "@/components/ErrorAlert";

const FormSchema = z.object({
  email: z.string().email({ message: "Введите корректный адрес электронной почты" }).min(1, { message: "Введите адрес электронной почты" }),
  password: z.string().regex(/^[a-zA-Z0-9~!@#$%^&*()\\-_=+{};:,<.>/?]*$/, { message: "Пароль должен содержать только латинские буквы, цифры или символы" }).min(8, { message: "Пароль должен состоять минимум из 8 символов" }).max(20, { message: "Пароль должен содержать не больше 20 символов" }),
});

const Page = () => {
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await login(data.email, data.password)
      dispatch(makeAuth({email: response.email!, roles: response.roles!, isAuth: true}))
    } catch (err: AxiosError | any) {
      if (axios.isAxiosError(err)) {
        setLoginError(err.response?.data.message);
      } else {
        setLoginError(err);
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full gap-x-20">
      <div>
        <p className="text-sky-500 text-7xl font-extrabold">
          AirTeach
        </p>
      </div>
      <div className=" flex flex-col bg-white text-2xl w-96 p-5 rounded-xl gap-y-3">
        <p className="text-gray-600 font-bold text-base">
          Авторизация
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-2/3 gap-y-3">
            <FormField
              control={form.control}
              name="email"
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
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
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
            <Button disabled={isSubmitting}  className=" text-gray-600 font-bold rounded-xl shadow-lg hover: bg-gray-100">Войти</Button>
          </form>
        </Form>

        {loginError && <ErrorAlert error={loginError} />}

        <div className="flex flex-row text-base py-5 gap-x-3 text-gray-500">
          <p>
            Нет аккаунта?
          </p>
          <Link href="/register" className="text-sky-500 font-bold hover:text-sky-600">
            Зарегистрируйтесь
          </Link>
        </div>
      </div>
    </div>

  )
}

export default Page