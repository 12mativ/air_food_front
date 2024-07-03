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

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ErrorAlert } from "../ErrorAlert";
import { editSimulator } from "../../http/simulators/simulatorsAPI";

import { updateSimulator } from "../../lib/features/simulators/simulatorsSlice";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Название тренажёра должно содержать минимум 1 символ"})
    .max(50, { message: "Название тренажёра не должно превышать 50 символов."}),
});

export const EditSimulatorModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "editSimulator";
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    const simulator = data.simulator;
    if (simulator) {
      form.setValue("name", simulator.name || "");
    }
  }, [form, data.simulator, isOpen]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await editSimulator({
        id: data.simulator!.id,
        name: values.name!
      });
      
      dispatch(updateSimulator(response.data));

      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при редактировании студента.");
    }
  };

  const handleClose = () => {
    setError("")
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Редактрирование тренажёра</DialogTitle>
          <DialogDescription>
            Введите данные тренажёра.
          </DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Название..."
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
