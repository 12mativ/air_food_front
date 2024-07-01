"use client";

import { useEffect, useState } from "react";
import { AddCoachToCourseModal } from "../modals/add-coach-to-event-modal";
import { AddStudentToCourseModal } from "../modals/add-student-to-course-modal";
import { CreateCourseModal } from "../modals/create-course-modal";
import { CreateEventModal } from "../modals/create-event-modal";
import { DeleteCourseModal } from "../modals/delete-course-modal";
import { DeleteStudentFromCourseModal } from "../modals/delete-student-modal";
import { EditCoachModal } from "../modals/edit-coach-modal";
import { DeleteSimulatorModal } from "../modals/delete-simulator-modal";
import { CreateSimulatorModal } from "../modals/create-simulator-modal";
import { EditSimulatorModal } from "../modals/edit-simulator-modal";
import { AddSimulatorToEventModal } from "../modals/add-simulator-to-event-modal";
import { EditCourseModal } from "../modals/edit-course-modal";
import { EditEventModal } from "../modals/edit-event-modal";
import { EditStudentModal } from "../modals/edit-student-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteCourseModal />
      <DeleteSimulatorModal />
      <EditCoachModal />
      <EditStudentModal />
      <EditSimulatorModal />
      <DeleteStudentFromCourseModal />
      <CreateCourseModal />
      <CreateEventModal />
      <CreateSimulatorModal />
      <AddStudentToCourseModal />
      <AddCoachToCourseModal />
      <AddSimulatorToEventModal/>
      <EditCourseModal />
      <EditEventModal />
    </>
  );
}
