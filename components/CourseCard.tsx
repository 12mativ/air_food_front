import React from "react";
import { ICourse } from "@/lib/features/courses/coursesSlise";
import Link from "next/link";
import { formateComplexDate } from "@/utils/formateComplexDate";

const CourseCard: React.FC<{ course: ICourse }> = ({ course }) => (
  <Link
    href={`/air-teach/courses/${course.id}`}
    className="hover:scale-[1.01] transition bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]"
  >
    <p className="text-l font-semibold">{course.name}</p>
    <p className="text-sm">
      {formateComplexDate(course.startDate) || ""} - {formateComplexDate(course.endDate) || ""}
    </p>
  </Link>
);

export default CourseCard;
