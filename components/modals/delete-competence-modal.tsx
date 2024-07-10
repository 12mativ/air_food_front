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
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorAlert } from "../ErrorAlert";
import { deleteCompetence } from "@/http/competencies/competenciesAPI";
import { removeCompetenceRedux } from "@/lib/features/competencies/competenciesSlice";

export const DeleteCompetenceModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const isModalOpen = isOpen && type === "removeCompetence";

  const handleDelete = async () => {
    if (data.competenceId) {
      try {
        await deleteCompetence({ competenceId: data.competenceId });
        dispatch(removeCompetenceRedux(data.competenceId));
        onClose();
      } catch (error) {
        setError("Произошла ошибка при удалении компетенции.");
      }
    } else {
      setError("Не указан идентификатор компетенции для удаления.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Удаление компетенции</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить компетенцию (<strong>{data.competenceName}</strong>)?
          </DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-red-700 hover:bg-red-900" onClick={handleDelete}>
            Удалить компетенцию
          </Button>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};