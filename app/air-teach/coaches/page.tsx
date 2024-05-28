"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getCoaches } from "@/http/coaches/coachesAPI";
import { addCoaches, ICoach } from "@/lib/features/coaches/coachesSlice";
import { isAdmin, isStudent } from "@/utils/roles";
import Link from "next/link";
import { useModal } from "@/hooks/use-modal-store";
import { redirect, useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import LoaderIndicator from "@/components/Loader";
import CoachCard from "@/components/CoachCard";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const coaches = useAppSelector((state) => state.coachesReducer.coaches);
    const user = useAppSelector((state) => state.userReducer.user);
    const { onOpen } = useModal();
    const params = useParams();
    useEffect(() => {
      setIsLoading(true);
      if (isAdmin(user)) {
        getCoaches()
          .then((res) => {
            dispatch(addCoaches(res.data));
          })
          .finally(() => setIsLoading(false));
      } else {
        getCoaches()
          .then((res) => {
            dispatch(addCoaches(res.data));
          })
          .finally(() => setIsLoading(false));
      }
    }, []);
  
    if (isLoading) {
      return <LoaderIndicator />;
    }

  return (
    <div className="w-full h-full items-center bg-[#ebebeb]">
      {isAdmin(user) && (
        <Link href={"/air-teach/students"}>
          <Button className="ml-12 w-32 bg-[#cecece] text-[#7f7f7f] hover:bg-sky-500">
            Все студенты
          </Button>
        </Link>
      )}
      {isAdmin(user) && (
        <Link href={"/air-teach/coaches"}>
          <Button className="ml-12 w-32 bg-[#7f7f7f] text-white hover:bg-sky-500">
            Все тренеры
          </Button>
        </Link>
      )}
      {isAdmin(user) && (
        <Link href={"/air-teach/courses"}>
          <Button className="ml-12 w-32 bg-[#cecece] text-[#7f7f7f] hover:bg-sky-500 hover:text-white">
            Все курсы
          </Button>
        </Link>
      )}
      <div className="flex flex-wrap mx-10 pt-10 mt-10">
        {coaches.length > 0 ? (
          coaches.map((coach: ICoach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-center text-gray-500 text-lg">
              Тренеры не найдены
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;