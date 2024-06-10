import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { deleteSimulator } from '@/http/simulators/simulatorsAPI';
import { removeSimulatorRedux } from '@/lib/features/simulators/simulatorsSlice';

export const DeleteSimulatorModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const isModalOpen = isOpen && type === "removeSimulator";

  const handleDelete = async () => {
    if (data.simulatorId) {
      try {
        await deleteSimulator({ simulatorId: data.simulatorId }); // Отправка запроса на удаление курса
        dispatch(removeSimulatorRedux(data.simulatorId)); // Удаление курса из Redux
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
          <DialogTitle>Удаление тренажёра</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить тренажёр?
          </DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-red-700 hover:bg-red-900" onClick={handleDelete}>
            Удалить тренажёр
          </Button>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};