"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  username: z.string().min(5, {message: "Введено некорректное имя ящика. Имя ящика должно быть длиной от 5 до 31 символов"}).max(31, {message: "Введено некорректное имя ящика. Имя ящика должно быть длиной от 5 до 31 символов"}),
  password: z.string().min(8, {message: "Используйте не менее 8 символов"}).max(40, {message: "Используйте менее 40 символов"}),
})

const User = ()=>{
  console.log(1)
}

const LoginPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
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
          Авторизация
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
                    <Input placeholder="username@example.com" {...field} />
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
                  <FormLabel >Пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <Button type="submit" className="hover: bg-gray-100" onClick={User}>Войти</Button>
          </form>
        </Form>
      </div>
    </div>

  )
}

export default LoginPage
