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

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className="flex items-center justify-center w-full h-full gap-x-20">
      <div>
        <p className="text-sky-500 text-7xl font-extrabold">
          AirTeach
        </p>
      </div>
      <div className="bg-white text-2xl w-fit p-3 rounded-xl">
        <p className="text-gray-500 font-semi\\bold text-base">
          Авторизация
        </p>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" />
        </div>
      </div>
    </div>

  )
}

export default LoginPage
