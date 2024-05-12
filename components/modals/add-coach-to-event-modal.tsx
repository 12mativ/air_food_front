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

import { editStudent, getStudents } from "@/http/students/studentsAPI";
import { addStudentToCourseRedux, updateEvent } from "@/lib/features/courses/coursesSlise";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../ErrorAlert";
import { addStudents } from "@/lib/features/students/studentsSlice";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { editEvent } from "@/http/events/eventsAPI";
import { getCoaches } from "@/http/coaches/coachesAPI";
import { addCoaches } from "@/lib/features/coaches/coachesSlice";

const formSchema = z.object({
  coachId: z.string({ required_error: "Выберите тренера для добавления." }),
});

export const AddCoachToCourseModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const coaches = useAppSelector((state) => state.coachesReducer.coaches);
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "addCoachToCourse";
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await editEvent({
        id: data.eventId!,
        coachId: values.coachId,
      });

      dispatch(updateEvent(response.data));

      form.reset();
      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при добавлении тренера.");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Добавить тренера на событие</DialogTitle>
          <DialogDescription>Ввыберите тренера из списка</DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="coachId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тренер</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тренера" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {coaches.map((coach) => (
                        <SelectItem value={coach.id}>
                          <p>
                            {coach.lastName ? coach.lastName : ""}{" "}
                            {coach.firstName
                              ? `${coach.firstName[0]}.`
                              : ""}{" "}
                            {coach.middleName
                              ? `${coach.middleName[0]}.`
                              : ""}
                            {coach.birthDate ? ` (${formateComplexDate(coach.birthDate)})` : ""} 
                          </p>
                          <p>{coach.email}</p>
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
