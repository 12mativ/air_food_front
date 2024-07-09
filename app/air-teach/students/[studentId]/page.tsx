"use client";

import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useParams } from "next/navigation";
import { Pencil } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { isAdmin } from "../../../../utils/roles";
import { Button } from "@/components/ui/button";
import { IStudent } from "../../../../lib/features/students/studentsSlice";

const Page = () => {
  const { onOpen } = useModal();
  const params = useParams();
  const student = useAppSelector((state) =>
    state.studentsReducer.students.find(
      (student) => student.id === params.studentId
    )
  );
  const user = useAppSelector((state) => state.userReducer.user);

  const daysOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const getTimeString = (
    student: IStudent | undefined,
    day: string
  ): string => {
    if (!student || !student.schedule || !student.schedule.times) {
      return "Не задано";
    }

    const timeEntry = student.schedule.times.find(
      (time) => time.day === day.toLowerCase()
    );
    if (!timeEntry || !timeEntry.time || timeEntry.time.length === 0) {
      return "Не задано";
    }

    const startTime = timeEntry.time[0].startTime;
    const endTime = timeEntry.time[0].endTime;

    return `${startTime}-${endTime}`;
  };

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
        <div className="flex flex-col text-gray-500 font-bold w-full">
          <div className="self-center">
            <p>Расписание свободного времени</p>
          </div>
          <div className="font-semibold mx-1 my-5">
            {daysOfWeek.map((day, index) => (
              <p key={index}>
                {day}: {getTimeString(student, day)}
              </p>
            ))}
          </div>
          {isAdmin(user) && (
            <Button
              onClick={() =>
                onOpen("editStudentSchedule", { student: student })
              }
              className="bg-sky-500 hover:bg-sky-400"
            >
              Редактировать
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
