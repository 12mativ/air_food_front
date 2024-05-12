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
import { addStudentToCourseRedux } from "@/lib/features/courses/coursesSlise";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { AxiosError } from "axios";
import { useState } from "react";
import { ErrorAlert } from "../ErrorAlert";

const formSchema = z.object({
  studentId: z.string({ required_error: "Выберите студента для добавления." }),
});

export const AddStudentToCourseModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const students = useAppSelector((state) => state.studentsReducer.students);
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "addStudentToCourse";
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await editStudent({
        id: values.studentId,
        courseId: data.courseId!,
      });
      const payload = { ...response.data, courseId: data.courseId! };
      dispatch(addStudentToCourseRedux(payload));

      form.reset();
      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при добавлении студента.");
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
          <DialogTitle>Добавить студента на курс</DialogTitle>
          <DialogDescription>Ввыберите студента из списка</DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Студент</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите студента" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem value={student.id}>
                          <p>
                            {student.lastName ? student.lastName : ""}{" "}
                            {student.firstName
                              ? `${student.firstName[0]}.`
                              : ""}{" "}
                            {student.middleName
                              ? `${student.middleName[0]}.`
                              : ""}
                            {student.birthDate ? ` (${formateComplexDate(student.birthDate)})` : ""} 
                          </p>
                          <p>{student.email}</p>
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
