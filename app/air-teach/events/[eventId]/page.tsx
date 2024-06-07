"use client";

import CoachCard from "@/components/CoachCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getCoaches, getCoachesOnCourse } from "@/http/coaches/coachesAPI";
import { addCoaches } from "@/lib/features/coaches/coachesSlice";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { isAdmin } from "@/utils/roles";
import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { IEvent } from "../../../../lib/features/events/eventsSlice";
import { addAllCoaches } from "../../../../lib/features/allCoaches/allCoachesSlice";
import LoaderIndicator from "../../../../components/Loader";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen } = useModal();

  const dispatch = useAppDispatch();
  const params = useParams();

  const user = useAppSelector((state) => state.userReducer.user);
  const event = useAppSelector((state) =>
    state.eventsReducer.events.find((event) => event.id === params.eventId)
  );
  const coachesOnCourse = useAppSelector(
    (state) => state.coachesReducer.coaches
  );

  useEffect(() => {
    setIsLoading(true);
    if (isAdmin(user)) {
      getCoaches({ coachForSearch: "" }).then((res) => {
        dispatch(addAllCoaches(res.data.coaches));
      });
    }

    getCoachesOnCourse({ eventId: params.eventId as string })
      .then((res) => {
        dispatch(addCoaches(res.data.coaches));
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoaderIndicator />
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-y-11">
        <div className="flex items-center gap-x-3">
          <p className="text-3xl font-bold text-sky-500">
            Мероприятие "{event?.name}"
          </p>
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
              {event?.endDate ? formateComplexDate(event.endDate) : "Не задано"}
            </p>
          </div>
        </div>
        {isAdmin(user) && (
          <>
            <p>Тренеры:</p>
            <div className="flex flex-wrap mx-10 mt-6 pt-10">
              {coachesOnCourse?.map((coach) => (
                <CoachCard coach={coach} />
              ))}
            </div>
          </>
        )}

        {isAdmin(user) && (
          <Button
            onClick={() => onOpen("addCoachToCourse", { eventId: event?.id })}
            className="bg-sky-500 hover:bg-sky-400"
          >
            Добавить тренера на мероприятие
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page;
