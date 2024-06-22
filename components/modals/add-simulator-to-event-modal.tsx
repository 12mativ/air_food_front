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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";

import { editStudent } from "@/http/students/studentsAPI";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { AxiosError } from "axios";
import { useState } from "react";
import { ErrorAlert } from "../ErrorAlert";
import { addStudentToCourse } from "@/http/courses/coursesAPI";
import { addSimulatorToEvent } from "../../http/events/eventsAPI";
import { addSimulator } from "../../lib/features/simulators/simulatorsSlice";
import { addStudent } from "../../lib/features/students/studentsSlice";

const formSchema = z.object({
  simulatorId: z.string({
    required_error: "Выберите тренажёр для добавления.",
  }),
});

export const AddSimulatorToEventModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const simulators = useAppSelector(
    (state) => state.simulatorsReducer.simulators
  );
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "addSimulatorToEvent";
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const simulator = simulators.find(
        (simulator) => simulator.id === values.simulatorId
      );

      if (!simulator) {
        throw new Error("Тренажёр не найден");
      }

      await addSimulatorToEvent({
        eventId: data.eventId!,
        simulatorId: values.simulatorId,
      });

      dispatch(addSimulator(simulator));

      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при добавлении тренажёра.");
    }
  };

  const handleClose = () => {
    form.reset();
    setError("");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Добавить тренажёр на мероприятие</DialogTitle>
          <DialogDescription>Ввыберите тренажер из списка</DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="simulatorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тренажёр</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тренажёр" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {simulators.map((simulator) => (
                        <SelectItem key={simulator.id} value={simulator.id}>
                          <p>{simulator.name ? simulator.name : ""} </p>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
