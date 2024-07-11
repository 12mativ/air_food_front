"use client";
import CompetenceCard from "@/components/CompetenceCard";
import LoaderIndicator from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getCompetencies } from "@/http/competencies/competenciesAPI";
import { addCompetence } from "@/lib/features/competencies/competenciesSlice";
import { isAdmin, isCourseOrganiser } from "@/utils/roles";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const competencies = useAppSelector((state) => state.compenciesReducer.competencies);
  const user = useAppSelector((state) => state.userReducer.user);
  const { onOpen } = useModal();

  useEffect(() => {
    setIsLoading(true);
    getCompetencies()
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          dispatch(addCompetence(res.data));
        }
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, user]);

  if (isLoading) {
    return <LoaderIndicator />;
  }

  return (
    <div className="w-full h-full items-center bg-[#ebebeb]">
      {isAdmin(user) && (
        <>
          <Link href={"/air-teach/students"}>
            <Button className="ml-12 w-32 bg-[#cecece] text-[#7f7f7f] hover:bg-sky-500 hover:text-white">
              Все студенты
            </Button>
          </Link>
          <Link href={"/air-teach/coaches"}>
            <Button className="ml-12 w-32 bg-[#cecece] text-[#7f7f7f] hover:bg-sky-500 hover:text-white">
              Все тренеры
            </Button>
          </Link>
          <Link href={"/air-teach/courses"}>
            <Button className="ml-12 w-32 bg-[#cecece] text-[#7f7f7f] hover:bg-sky-500 hover:text-white">
              Все курсы
            </Button>
          </Link>
          <Link href={"/air-teach/competencies"}>
            <Button className="ml-12 w-auto bg-[#7f7f7f] text-white hover:bg-sky-500 hover:text-white">
              Список компетенций
            </Button>
          </Link>
        </>
      )}
      <div className="flex gap-y-3 flex-wrap mx-10 mt-6 pt-10 ">
        {Array.isArray(competencies) && competencies.length > 0 ? (
          competencies.map(
            (competence) =>
              competence.id && (
                <CompetenceCard
                  key={competence.id}
                  competence={competence}
                />
              )
          )
        ) : (
          <div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap mx-10">
        {(isCourseOrganiser(user) || isAdmin(user)) && (
          <button
            onClick={() => onOpen("createCompetence")}
            className="flex rounded-xl p-4 w-full 2xl:w-[50.5%] justify-center items-center group"
          >
            <div className="bg-[#ebebeb] group-hover:bg-sky-500 transition-colors rounded-full">
              <BsPlus size={50} className="text-[#7f7f7f] shadow-md rounded-full group-hover:text-white" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
