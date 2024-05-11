"use client";

import { useEffect, useState } from "react";
import { EditStudentModal } from "../modals/edit-student-modal";
import { CreateCourseModal } from "../modals/create-course-modal";

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
      <CreateCourseModal />
    </>
  );
}
