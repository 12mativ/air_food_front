// CourseCard.tsx
import { useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { isAdmin, isCourseOrganiser } from "@/utils/roles";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ICourse } from "../lib/features/courses/coursesSlice";
import { DeleteCourseModal } from "./modals/delete-course-modal";

const CourseCard: React.FC<{ course: ICourse }> = ({ course }) => {
  const { onOpen } = useModal();
  const user = useAppSelector((state) => state.userReducer.user);

  const handleDelete = (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen("removeCourse", { courseId: course.id, courseName: course.name });
  };

  return (
    <>
      <Link
        href={`/air-teach/courses/${course.id}`}
        className="relative hover:scale-[1.01] transition bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]"
      >
        {(isCourseOrganiser(user) || isAdmin(user)) && (
          <div onClick={handleDelete}>
            <X
              size={20}
              className="absolute right-2 text-red-500 hover:scale-[1.1] transition cursor-pointer"
            />
          </div>
        )}
        <p className="text-l font-semibold">{course.name}</p>
        <p className="text-sm">
          {formateComplexDate(course.startDate) || ""} -{" "}
          {formateComplexDate(course.endDate) || ""}
        </p>
      </Link>
      <DeleteCourseModal />
    </>
  );
};

export default CourseCard;