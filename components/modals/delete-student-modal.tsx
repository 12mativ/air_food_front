import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteStudent } from '@/lib/features/students/studentsSlice';
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

export const DeleteStudentModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const isModalOpen = isOpen && type === "deleteStudent";

  const handleDelete = () => {
    if (data.studentId) {
      try {
        dispatch(deleteStudent(data.studentId));
        onClose();
      } catch (error) {
        setError("Произошла ошибка при удалении студента.");
      }
    } else {
      setError("Не указан идентификатор студента для удаления.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Удаление обучающегося</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить этого студента?
          </DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <DialogFooter>
          <Button className = "bg-red-700 hover:bg-red-900" onClick={handleDelete}>
            Удалить
          </Button>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};