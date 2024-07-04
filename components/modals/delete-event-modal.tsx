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
import { updateCourse } from '@/lib/features/courses/coursesSlice'; // Предполагается, что у вас есть такой экшен
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorAlert } from "../ErrorAlert";
import { getCourse } from '@/http/courses/coursesAPI'; // Импортируйте функцию для получения курса

export const DeleteEventModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const isModalOpen = isOpen && type === "removeEvent";

  const handleDelete = async () => {
    if (!data.eventId || !data.courseId) {
      setError("Не указан идентификатор мероприятия или курса для удаления.");
      return;
    }

    try {
      await deleteEvent({ eventId: data.eventId });
      dispatch(removeEvent({ eventId: data.eventId }));

      // Получение обновленных данных курса
      const updatedCourse = await getCourse({ courseId: data.courseId });
      dispatch(updateCourse(updatedCourse.data));

      onClose(); // Убедитесь, что onClose вызывается после успешного удаления
    } catch (error) {
      console.error("Ошибка при удалении мероприятия:", error);
      setError("Произошла ошибка при удалении мероприятия.");
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