import React from 'react';
import { useParams } from "next/navigation";
import { IStudent } from "@/lib/features/students/studentsSlice";
import Link from "next/link";
import { X } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { DeleteStudentFromCourseModal } from "@/components/modals/delete-student-modal";

interface StudentCardProps {
  student: IStudent;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const { onOpen } = useModal();
  const params = useParams();
  const courseId = params?.courseId;

  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;

  const isCoursesPage = courseIdString !== undefined;

  const handleDelete = (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) => {
    e.preventDefault(); // Предотвращаем стандартное поведение ссылки
    e.stopPropagation(); // Предотвращаем всплытие события
    if (courseIdString) {
      onOpen("removeStudentFromCourse", { studentId: student.id, courseId: courseIdString });
    }
  };

  return (
    <>
      <Link
        href={`/air-teach/students/${student.id}`}
        className="relative hover:scale-[1.01] transition bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]"
      >
        {isCoursesPage && (
          <div onClick={handleDelete}>
            <X
              size={20}
              className="absolute right-2 text-red-500 hover:scale-[1.1] transition cursor-pointer"
            />
          </div>
        )}
        <p className="text-l font-semibold">{student.email}</p>
        <p className="text-sm">
          {student.firstName} {student.lastName}
        </p>
      </Link>
      <DeleteStudentFromCourseModal />
    </>
  );
};

export default StudentCard;