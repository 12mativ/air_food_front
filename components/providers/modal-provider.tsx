"use client";

import { useEffect, useState } from "react";
import { EditStudentModal } from "../modals/edit-student-modal";
import { CreateCourseModal } from "../modals/create-course-modal";
import { CreateEventModal } from "../modals/create-event-modal";
import { AddStudentToCourseModal } from "../modals/add-student-to-course-modal";
import { AddCoachToCourseModal } from "../modals/add-coach-to-event-modal";
import { DeleteStudentModal } from "../modals/delete-student-modal";

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
      <EditStudentModal />
      <DeleteStudentModal />
      <CreateCourseModal />
      <CreateEventModal />
      <AddStudentToCourseModal />
      <AddCoachToCourseModal />
    </>
  );
}
