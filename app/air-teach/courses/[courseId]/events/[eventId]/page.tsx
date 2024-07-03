"use client";

import CoachCard from "@/components/CoachCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getCoaches, getCoachesOnCourse } from "@/http/coaches/coachesAPI";
import { addCoaches } from "@/lib/features/coaches/coachesSlice";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { isAdmin, isCourseOrganiser } from "@/utils/roles";
import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdSchool } from "react-icons/md";
import LoaderIndicator from "../../../../../../components/Loader";
import { addAllCoaches } from "../../../../../../lib/features/allCoaches/allCoachesSlice";
import SimulatorCard from "../../../../../../components/SimulatorCard";
import { addSimulators } from "../../../../../../lib/features/simulators/simulatorsSlice";
import { getSimulatorsOnEvent, getSimulatorsOnCourse } from "@/http/simulators/simulatorsAPI";


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
  const simulators = useAppSelector(
    (state) => state.simulatorsReducer.simulators
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        if (isAdmin(user)) {
          const coachesResponse = await getCoaches({ coachForSearch: "" });
          dispatch(addAllCoaches(coachesResponse.data.coaches));
        }
  
        const coachesOnCourseResponse = await getCoachesOnCourse({ eventId: params.eventId as string });
        dispatch(addCoaches(coachesOnCourseResponse.data.coaches));
  
        if (isAdmin(user) || isCourseOrganiser(user)) {
          const simulatorsOnEventResponse = await getSimulatorsOnEvent({ eventId: params.eventId as string });
          dispatch(addSimulators(simulatorsOnEventResponse.data?.simulators ?? []));
  
          const simulatorsOnCourseResponse = await getSimulatorsOnCourse({ courseId: params.courseId as string });
          dispatch(addSimulators(simulatorsOnCourseResponse.data?.simulators ?? []));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [params.eventId, params.courseId, user, dispatch]);

  if (isLoading) {
    return <LoaderIndicator />;
  }

  const filteredSimulators = simulators?.filter(simulator => simulator.courseId === params.courseId);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-y-11">
        <div className="flex items-center gap-x-3">
          <p className="text-3xl font-bold text-sky-500">
            Мероприятие "{event?.name}"
          </p>
          <Pencil
            className="text-sky-500 cursor-pointer"
            onClick={() => {
              onOpen("editEvent", { event: event });
            }}
          />
        </div>
        <div className="flex flex-row items-center gap-x-20">
          <MdSchool className="text-9xl text-gray-400" />
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
                <CoachCard key={coach.id} coach={coach} />
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
        {isAdmin(user) && (
          <>
            <p>Тренажёры:</p>
            <div className="flex flex-wrap mx-10 mt-6 pt-10">
              {filteredSimulators?.map((simulator) => (
                <SimulatorCard key={simulator.id} simulator={simulator} />
              ))}
            </div>
          </>
        )}
        {isAdmin(user) && (
          <Button
            onClick={() =>
              onOpen("addSimulatorToEvent", { eventId: event?.id })
            }
            className="bg-sky-500 hover:bg-sky-400"
          >
            Добавить тренажер на мероприятие
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page;