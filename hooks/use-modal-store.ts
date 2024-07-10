import { ICoach } from "@/lib/features/coaches/coachesSlice";
import { ICompetence } from "@/lib/features/competencies/competenciesSlice";
import { ICourse } from "@/lib/features/courses/coursesSlice";
import { IEvent } from "@/lib/features/events/eventsSlice";
import { ISimulator } from "@/lib/features/simulators/simulatorsSlice";
import { IStudent } from "@/lib/features/students/studentsSlice";
import { create } from "zustand";

export type ModalType = "editStudent" | "createCourse" | "createEvent" | "addStudentToCourse" | "addCoachToCourse" | "removeStudentFromCourse" | "editCoach" | "removeCourse" | "removeEvent" | "editEvent" | "editCourse" | "removeSimulator" | "createSimulator" | "editSimulator" | "addSimulatorToEvent"| "removeCompetence"|"createCompetence";

export interface ModalData {
  student?: IStudent;
  studentEmail?: string;
  studentId?: string;
  courseId?: string;
  eventId?: string;
  coach?: ICoach;
  coachId?: string;
  eventName?: string;
  courseName?: string;
  course?: ICourse;
  event?: IEvent;
  simulator?: ISimulator;
  simulatorId?: string;
  competenceId?: string;
  competenceName?: string;
  competence?: ICompetence
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