"use client";

import { IoPersonSharp } from "react-icons/io5";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import { Pencil } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { formateComplexDate } from "@/utils/formateComplexDate";

const Page = () => {
  const { onOpen } = useModal();
  const params = useParams();
  const coach = useAppSelector((state) =>
    state.coachesReducer.coaches.find(
      (coach) => coach.id === params.coachId
    )
  );

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-y-11">
        <div className="flex items-center gap-x-3">
          <p className="text-3xl font-bold text-sky-500">Общая информация</p>
          {/* <Pencil className="text-sky-500 cursor-pointer" onClick={() => {
            onOpen("editStudent", {student: student})
            }} /> */}
        </div>
        <div className="flex flex-row items-center gap-x-20">
          <IoPersonSharp className="text-9xl text-gray-400" />
          <div className="flex flex-col gap-y-3 text-gray-500 font-semibold">
            <p>Фамилия: {coach?.lastName ? coach.lastName : "Не задано"}</p>
            <p>Имя: {coach?.firstName ? coach.firstName : "Не задано"}</p>
            <p>Отчество: {coach?.middleName ? coach.middleName : "Не задано"}</p>
            <p>
              Дата рождения: {coach?.birthDate ? formateComplexDate(coach.birthDate) : "Не задано"}
            </p>
            <p>Почта: {coach?.email}</p>
            <p>Компетенция: Не задано</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
