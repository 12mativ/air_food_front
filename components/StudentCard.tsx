import React from "react";
import { IStudent } from "@/lib/features/students/studentsSlice";

const StudentCard: React.FC<{ student: IStudent }> = ({ student }) => (
    <div className="bg-white rounded-xl p-4 shadow-md m-2 h-40 sm:w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]">
        <p className="text-l font-semibold">{student.email}</p>
        <p className="text-sm">{student.firstName} {student.lastName}</p>
    </div>
);

export default StudentCard;
