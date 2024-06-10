import { ICoach } from "@/lib/features/coaches/coachesSlice";
import { ISimulator } from "@/lib/features/simulators/simulatorsSlice";
import { IStudent } from "@/lib/features/students/studentsSlice";
import { create } from "zustand";

export type ModalType = "editStudent" | "createCourse" | "createEvent" | "addStudentToCourse" | "addCoachToCourse" | "removeStudentFromCourse" | "editCoach" | "removeCourse" | "removeSimulator" | "createSimulator";

export interface ModalData {
  student?: IStudent;
  studentEmail?: string;
  studentId? : string;
  courseId?: string;
  eventId?: string;
  coach?: ICoach;
  coachId?: string;
  simulator?: ISimulator;
  simulatorId?: string;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: Partial<ModalData>; 
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => {
  return {
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) => set({ isOpen: true, type, data: data ?? {} }), 
    onClose: () => set({ type: null, isOpen: false, data: {} }),
  };
});