"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ErrorAlert } from "../ErrorAlert";
import { CalendarIcon } from "lucide-react";
import { editStudent } from "@/http/students/studentsAPI";
import { updateStudent } from "@/lib/features/students/studentsSlice";

const formSchema = z.object({
  monday: z.string().optional(),
  tuesday: z.string().optional(),
  wednesday: z.string().optional(),
  thursday: z.string().optional(),
  friday: z.string().optional(),
  saturday: z.string().optional(),
  sunday: z.string().optional(),
});

export const EditStudentSheduleModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "editStudentSchedule";
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // try {
    //   const response = await editStudent({
    //     id: data.student!.id,
    //     times: values
    //   });

    //   dispatch(updateStudent(response.data));

    //   handleClose();
    // } catch (error: AxiosError | any) {
    //   setError("Произошла ошибка при редактировании студента.");
    // }
    console.log(values);
    handleClose();
  };

  const handleClose = () => {
    setError("");
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Редактрирование расписания свободного времени</DialogTitle>
          <DialogDescription>Введите свободное время в формате 12-15</DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="monday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Понедельник</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="..."
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
              name="tuesday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Вторник</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      type="text"
                      placeholder="..."
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
              name="wednesday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Среда</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="..."
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
              name="thursday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Четрверг</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="..."
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
              name="friday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пятница</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="..."
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
              name="saturday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Суббота</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="..."
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
              name="sunday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Воскресенье</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="..."
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