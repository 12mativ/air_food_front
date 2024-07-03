"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";

import { editCoach } from "@/http/coaches/coachesAPI";
import { updateCoach } from "@/lib/features/coaches/coachesSlice";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../ErrorAlert";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Имя должно содержать минимум 1 символ" })
    .max(50, { message: "Имя не должно превышать 50 символов."}),
  lastName: z
    .string()
    .min(1, { message: "Фамилия должна содержать минимум 1 символ" })
    .max(50, { message: "Фамилия не должна превышать 50 символов."}),
  middleName: z
    .string()
    .max(50, { message: "Отчество не должно превышать 50 символов."})
});

export const EditCoachModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "editCoach";
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    const coach = data.coach;
    if (coach) {
      form.setValue("firstName", coach.firstName || "");
      form.setValue("lastName", coach.lastName || "");
      form.setValue("middleName", coach.middleName || "");
    }
  }, [form, data.coach, isOpen]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await editCoach({
        id: data.coach!.id,
        firstName: values.firstName!,
        lastName: values.lastName!,
        middleName: values.middleName!
      });
      
      dispatch(updateCoach(response.data));

      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при редактировании тренера.");
    }
  };

  const handleClose = () => {
    form.reset();
    setError("")
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Редактрирование тренера</DialogTitle>
          <DialogDescription>
            Введите данные тренера.
          </DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Фамилия..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Имя..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Отчество (при наличии)</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Отчество..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
