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
import { createSimulator } from "@/http/simulators/simulatorsAPI";
import { addSimulator } from "@/lib/features/simulators/simulatorsSlice";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string({ required_error: "Обязательно для заполнения." })
  .min(1, { message: "Название тренажёра должно содержать минимум 1 символ"})
  .max(50, { message: "Название тренажёра не должно превышать 50 символов.",}),
  courseId: z.string({ required_error: "Обязательно для заполения" }),
});

export const CreateSimulatorModal = () => {
  const { isOpen, onClose, type } = useModal();
  const params = useParams();
  const courseId = params?.courseId;
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "createSimulator";
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      courseId: courseIdString || "", 
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createSimulator({
        name: values.name!,
        courseId: values.courseId!,
      });

      dispatch(addSimulator(response.data));

      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при создании тренажёра.");
    }
  };

  useEffect(() => {
    if (courseIdString) {
      form.setValue('courseId', courseIdString);
    }
  }, [courseIdString, form]);

  useEffect(() => {
    if (isModalOpen && courseIdString) {
      form.setValue('courseId', courseIdString);
    }
  }, [isModalOpen, courseIdString, form]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Создание тренажёра</DialogTitle>
          <DialogDescription>Введите данные тренажёра.</DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название тренажёра</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Название тренажёра..."
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