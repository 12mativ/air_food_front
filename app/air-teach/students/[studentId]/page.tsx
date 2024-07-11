"use client";

import React, { useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useParams } from "next/navigation";
import { Pencil } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { isAdmin } from "../../../../utils/roles";
import { Button } from "@/components/ui/button";
import { addCurriculum, IStudent } from "../../../../lib/features/students/studentsSlice";
import { IoBarChartSharp } from "react-icons/io5";
import { createCurriculum } from "../../../../http/curriculum/curriculumAPI";
import CurriculumCalendar from "../../../../components/CurriculumCalendar";
import { IEvent } from "../../../../lib/features/events/eventsSlice";

const Page = () => {
  const { onOpen } = useModal();
  const dispatch = useAppDispatch()
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

    const dayInEnglish = convertDayToEnglish(day);

    const timeEntries = student.schedule.times.filter((time) => {
      return time.day === dayInEnglish;
    });

    if (!timeEntries || timeEntries.length === 0) {
      return "Не задано";
    }

    const timeStrings = timeEntries
      .map((timeEntry) =>
        timeEntry.time.map((t) => `${t.startTime}-${t.endTime}`).join(", ")
      )
      .join(", ");

    return timeStrings;
  };

  type DayOfWeek =
    | "понедельник"
    | "вторник"
    | "среда"
    | "четверг"
    | "пятница"
    | "суббота"
    | "воскресенье";

  const convertDayToEnglish = (day: string): string => {
    const daysMap: Record<DayOfWeek, string> = {
      понедельник: "monday",
      вторник: "tuesday",
      среда: "wednesday",
      четверг: "thursday",
      пятница: "friday",
      суббота: "saturday",
      воскресенье: "sunday",
    };

    return daysMap[day.toLowerCase() as DayOfWeek] || day.toLowerCase();
  };

  const handleCreateCurriculum = async () => {
    if (student) {
      const schedule = student.schedule.times.map(t => ({day: t.day, time: t.time.map(tm => ({startTime: tm.startTime, endTime: tm.endTime}))}))
      const response = await createCurriculum({studentId: student.id, curriculumId: student.curriculumId, schedule})

      dispatch(addCurriculum(response.data))
    }
  }

  const convertEvents = (events: IEvent[]) => {
    return events.map(e => ({title: e.name, start: e.startDate, end: e.endDate}))
  }
 
  useEffect(() => {}, [student]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-y-11 w-full">
        <div className="flex items-center gap-x-3">
          <p className="text-3xl font-bold text-sky-500">Общая информация</p>
          <Pencil
            className="text-sky-500 cursor-pointer"
            onClick={() => {
              onOpen("editStudent", { student: student });
            }}
          />
        </div>
        <div className="flex flex-col items-center gap-y-6">
          <div className="flex flex-row items-center gap-x-20">
            <IoPersonSharp className="text-9xl text-gray-400" />
            <div className="flex flex-col gap-y-3 text-gray-500 font-semibold">
              <p>
                Фамилия: {student?.lastName ? student.lastName : "Не задано"}
              </p>
              <p>Имя: {student?.firstName ? student.firstName : "Не задано"}</p>
              <p>
                Отчество:{" "}
                {student?.middleName ? student.middleName : "Не задано"}
              </p>
              <p>
                Дата рождения:{" "}
                {student?.birthDate
                  ? formateComplexDate(student.birthDate)
                  : "Не задано"}
              </p>
              <p>Почта: {student?.email}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-3">
              <p className="text-3xl font-bold text-sky-500">Компетенции</p>
              <Pencil className="text-sky-500 cursor-pointer" />
            </div>
            {/* <div className="flex flex-row items-center gap-x-20">
              <IoBarChartSharp className="text-9xl text-gray-400" />
            </div> */}
          </div>

          <div className="flex flex-col text-gray-500 font-bold w-[900px]">
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

          <div className="w-full">
            <Button onClick={() => handleCreateCurriculum()} className="bg-sky-500 hover:bg-sky-400">
              Сформировать учебный план
            </Button>
            {student?.curriculum && (
              <CurriculumCalendar events={convertEvents(student.curriculum.cirriculumEvents)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
