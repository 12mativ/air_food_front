import React from "react";
import { IStudent } from "@/lib/features/students/studentsSlice";
import Link from "next/link";
import Header from "./header";

const StudentCard: React.FC<{ student: IStudent }> = ({ student }) => (

    <Link href={`/air-teach/students/${student.id}`} className="hover:scale-[1.01] transition bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]">
        <p className="text-l font-semibold">{student.email}</p>
        <p className="text-sm">{student.firstName} {student.lastName}</p>
    </Link>


);

export default StudentCard;
