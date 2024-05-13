import { IStudent } from "@/lib/features/students/studentsSlice";
import Link from "next/link";
import React from "react";

const StudentCard: React.FC<{ student: IStudent }> = ({ student }) => (
    <Link href={`/air-teach/students/${student.id}`} className="hover:scale-[1.01] transition bg-white rounded-xl p-4 shadow-md m-2 h-40 w-fit">
        <p className="text-l font-semibold">{student.email}</p>
        <p className="text-sm">{student.firstName} {student.lastName}</p>
    </Link>


);

export default StudentCard;
