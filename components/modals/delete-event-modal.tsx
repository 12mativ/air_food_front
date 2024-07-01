import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { deleteEvent } from '@/http/events/eventsAPI';
import { removeEvent } from '@/lib/features/events/eventsSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorAlert } from "../ErrorAlert";

export const DeleteEventModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const isModalOpen = isOpen && type === "removeEvent";

  const handleDelete = async () => {
    if (data.eventId) {
      try {
        await deleteEvent({ eventId: data.eventId });
        dispatch(removeEvent({ eventId: data.eventId }));
        onClose();
      } catch (error) {
        setError("Произошла ошибка при удалении мероприятия.");
      }
    } else {
      setError("Не указан идентификатор мероприятия для удаления.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Удаление мероприятия</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить мероприятие (<strong>{data.eventName}</strong>)?
          </DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-red-700 hover:bg-red-900" onClick={handleDelete}>
            Удалить мероприятие
          </Button>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};