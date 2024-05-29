import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeStudentFromCourseRedux } from '@/lib/features/courses/coursesSlise';
import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ErrorAlert } from "../ErrorAlert";

export const DeleteStudentFromCourseModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const isModalOpen = isOpen && type === "removeStudentFromCourse";

  const handleDelete = () => {
    if (data.studentId && data.courseId) {
      try {
        dispatch(removeStudentFromCourseRedux({ studentId: data.studentId, courseId: data.courseId }));
        onClose();
      } catch (error) {
        setError("Произошла ошибка при удалении студента с курса.");
      }
    } else {
      setError("Не указан идентификатор студента или курса для удаления.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Удаление студента с курса</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить студента (<strong>{data.studentEmail}</strong>) с курса?
          </DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-red-700 hover:bg-red-900" onClick={handleDelete}>
            Удалить с курса
          </Button>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};