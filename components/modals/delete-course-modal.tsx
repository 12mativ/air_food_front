import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCourseRedux } from '@/lib/features/courses/coursesSlise';
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
import { deleteCourse } from '@/http/courses/coursesAPI'; // Предполагается, что у вас есть API для удаления курса

export const DeleteCourseModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const isModalOpen = isOpen && type === "removeCourse";

  const handleDelete = async () => {
    if (data.courseId) {
      try {
        await deleteCourse({ courseId: data.courseId }); // Отправка запроса на удаление курса
        dispatch(removeCourseRedux(data.courseId)); // Удаление курса из Redux
        onClose();
      } catch (error) {
        setError("Произошла ошибка при удалении курса.");
      }
    } else {
      setError("Не указан идентификатор курса для удаления.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Удаление курса</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить курс?
          </DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-red-700 hover:bg-red-900" onClick={handleDelete}>
            Удалить курс
          </Button>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};