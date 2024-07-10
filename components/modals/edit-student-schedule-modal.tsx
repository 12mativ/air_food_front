"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { editStudent } from "@/http/students/studentsAPI";
import { updateStudent } from "@/lib/features/students/studentsSlice";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
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
import { Button } from "@/components/ui/button";
import { ErrorAlert } from "../ErrorAlert";

const formSchema = z.object({
  monday: z.string().optional(),
  tuesday: z.string().optional(),
  wednesday: z.string().optional(),
  thursday: z.string().optional(),
  friday: z.string().optional(),
  saturday: z.string().optional(),
  sunday: z.string().optional(),
});

const parseTime = (timeStr: string) => {
  const [startTime, endTime] = timeStr.split('-').map(Number);
  return { startTime, endTime };
};

const parseTimes = (values: z.infer<typeof formSchema>) => {
  const times = [];
  for (const [day, timeStr] of Object.entries(values)) {
    if (timeStr) {
      const timeArray = timeStr.split(',').map(t => parseTime(t.trim()));
      times.push({
        day,
        time: timeArray,
      });
    }
  }
  return times;
};

const daysOfWeek = [
  { key: 'monday', label: 'Понедельник' },
  { key: 'tuesday', label: 'Вторник' },
  { key: 'wednesday', label: 'Среда' },
  { key: 'thursday', label: 'Четверг' },
  { key: 'friday', label: 'Пятница' },
  { key: 'saturday', label: 'Суббота' },
  { key: 'sunday', label: 'Воскресенье' },
];

export const EditStudentSheduleModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");
  const isModalOpen = isOpen && type === "editStudentSchedule";
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    const student = data.student;
    if (student) {
      form.setValue("monday", student.schedule.times.find(t => t.day === 'monday')?.time.map(t => `${t.startTime}-${t.endTime}`).join(', ') || "");
      form.setValue("tuesday", student.schedule.times.find(t => t.day === 'tuesday')?.time.map(t => `${t.startTime}-${t.endTime}`).join(', ') || "");
      form.setValue("wednesday", student.schedule.times.find(t => t.day === 'wednesday')?.time.map(t => `${t.startTime}-${t.endTime}`).join(', ') || "");
      form.setValue("thursday", student.schedule.times.find(t => t.day === 'thursday')?.time.map(t => `${t.startTime}-${t.endTime}`).join(', ') || "");
      form.setValue("friday", student.schedule.times.find(t => t.day === 'friday')?.time.map(t => `${t.startTime}-${t.endTime}`).join(', ') || "");
      form.setValue("saturday", student.schedule.times.find(t => t.day === 'saturday')?.time.map(t => `${t.startTime}-${t.endTime}`).join(', ') || "");
      form.setValue("sunday", student.schedule.times.find(t => t.day === 'sunday')?.time.map(t => `${t.startTime}-${t.endTime}`).join(', ') || "");
    }
  }, [form, data.student, isOpen]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const times = parseTimes(values);
      const response = await editStudent({
        id: data.student!.id,
        times,
      });

      dispatch(updateStudent(response.data));

      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при редактировании студента.");
    }
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
          <DialogTitle>Редактирование расписания свободного времени</DialogTitle>
          <DialogDescription>Введите свободное время в формате 12-15, 17-18</DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {daysOfWeek.map((day) => (
              <FormField
                key={day.key}
                control={form.control}
                name={day.key as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{day.label}</FormLabel>
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
            ))}
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