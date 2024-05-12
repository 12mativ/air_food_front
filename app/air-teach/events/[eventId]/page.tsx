"use client";

import CoachCard from "@/components/CoachCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getCoaches } from "@/http/coaches/coachesAPI";
import { addCoaches } from "@/lib/features/coaches/coachesSlice";
import { IEvent } from "@/lib/features/courses/coursesSlise";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { isAdmin } from "@/utils/roles";
import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";

const Page = () => {
  const { onOpen } = useModal();
  const [event, setEvent] = useState<IEvent | null>(null);

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.userReducer.user);
  const params = useParams();
  const courses = useAppSelector((state) => state.coursesReducer.courses);

  useEffect(() => {
    courses.forEach(course => course.events.forEach(event => {
      if (event.id === params.eventId) {
        setEvent(event)
      }
    }))
  }, [])

  useEffect(() => {
    if (isAdmin(user)) {
      getCoaches().then((res) => {
        dispatch(addCoaches(res.data));
      });
    }
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-y-11">
        <div className="flex items-center gap-x-3">
          <p className="text-3xl font-bold text-sky-500">Мероприятие "{event?.name}"</p>
          {/* <Pencil
            className="text-sky-500 cursor-pointer"
            onClick={() => {
              onOpen("editStudent", { student: student });
            }}
          /> */}
        </div>
        <div className="flex flex-row items-center gap-x-20">
          <IoPersonSharp className="text-9xl text-gray-400" />
          <div className="flex flex-col gap-y-3 text-gray-500 font-semibold">
            <p>
              Начало мероприятия:{" "}
              {event?.startDate
                ? formateComplexDate(event.startDate)
                : "Не задано"}
            </p>
            <p>
              Конец мероприятия:{" "}
              {event?.endDate
                ? formateComplexDate(event.endDate)
                : "Не задано"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mx-10">
          {event?.coaches?.map(coach => (
            <CoachCard coach={coach} />
          ))}
        </div>
        <Button onClick={() => onOpen("addCoachToCourse", {eventId: event?.id})} className="bg-sky-500 hover:bg-sky-400">Добавить тренера на мероприятие</Button>
      </div>
    </div>
  );
};

export default Page;
