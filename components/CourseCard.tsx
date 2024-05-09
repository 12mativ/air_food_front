import React from "react";
import { ICourse } from "@/lib/features/courses/coursesSlise";

const CourseCard: React.FC<{ course: ICourse }> = ({ course }) => (
    <div className="bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]">
        <p className="text-l font-semibold">{course.name}</p>
        <p className="text-sm">{course.startDate} - {course.endDate}</p>
    </div>
);

export default CourseCard;
