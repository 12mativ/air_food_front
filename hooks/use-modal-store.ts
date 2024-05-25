import { IStudent } from "@/lib/features/students/studentsSlice";
import { create } from "zustand";

export type ModalType = "editStudent" | "createCourse" | "createEvent" | "addStudentToCourse" | "addCoachToCourse" | "deleteStudent";

export interface ModalData {
  student?: IStudent;
  studentId? : string;
  courseId?: string;
  eventId?: string;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: Partial<ModalData>; // Используем Partial для необязательных свойств
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => {
  return {
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) => set({ isOpen: true, type, data: data ?? {} }), // Используем оператор ?? для обработки undefined
    onClose: () => set({ type: null, isOpen: false, data: {} }), // Очищаем data при закрытии модального окна
  };
});