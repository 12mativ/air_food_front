"use client";

import { IoPersonSharp } from "react-icons/io5";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { Pencil } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { formateComplexDate } from "@/utils/formateComplexDate";

const Page = () => {
  const { onOpen } = useModal();
  const params = useParams();
  const student = useAppSelector((state) =>
    state.studentsReducer.students.find(
      (student) => student.id === params.studentId
    )
  );

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-y-11">
        <div className="flex items-center gap-x-3">
          <p className="text-3xl font-bold text-sky-500">Общая информация</p>
          <Pencil
            className="text-sky-500 cursor-pointer"
            onClick={() => {
              onOpen("editStudent", { student: student });
            }}
          />
        </div>
        <div className="flex flex-row items-center gap-x-20">
          <IoPersonSharp className="text-9xl text-gray-400" />
          <div className="flex flex-col gap-y-3 text-gray-500 font-semibold">
            <p>Фамилия: {student?.lastName ? student.lastName : "Не задано"}</p>
            <p>Имя: {student?.firstName ? student.firstName : "Не задано"}</p>
            <p>
              Отчество: {student?.middleName ? student.middleName : "Не задано"}
            </p>
            <p>
              Дата рождения:{" "}
              {student?.birthDate
                ? formateComplexDate(student.birthDate)
                : "Не задано"}
            </p>
            <p>Почта: {student?.email}</p>
            <p>Компетенция: Не задано</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
