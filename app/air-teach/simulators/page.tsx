"use client";

import SimulatorCard from "@/components/SimulatorCard";
import LoaderIndicator from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getSimulators } from "@/http/simulators/simulatorsAPI";
import { isAdmin, isCoach, isCourseOrganiser, isStudent } from "@/utils/roles";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { addSimulators } from "@/lib/features/simulators/simulatorsSlice";

const Page = () => {
  const [simulatorForSearch, setSimulatorForSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 8;
  const dispatch = useAppDispatch();
  const simulators = useAppSelector(
    (state) => state.simulatorsReducer.simulators
  );
  const user = useAppSelector((state) => state.userReducer.user);
  const { onOpen } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSimulators({
        simulatorForSearch: simulatorForSearch,
        page: currentPage,
        limit: limit,
      });
      dispatch(addSimulators(response.data.simulators));
      setTotalPages(Math.ceil(response.data.simulatorsTotalAmount / limit));
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [simulatorForSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSimulators({
        simulatorForSearch: simulatorForSearch,
        page: currentPage,
        limit: limit,
      });
      dispatch(addSimulators(response.data.simulators));
      setTotalPages(Math.ceil(response.data.simulatorsTotalAmount / limit));
    };

    fetchData();
  }, [currentPage]);

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
          <Link href={"/air-teach/simulators"}>
            <Button className="ml-12 w-32 bg-[#7f7f7f] text-white hover:bg-sky-500">
              Все тренажёры
            </Button>
          </Link>
        </>
      )}
      <div className="flex flex-wrap mx-10 mt-6 pt-10">
        {simulators.length > 0
          ? (simulators.map((simulator) => (
              <SimulatorCard key={simulator.id} simulator={simulator} />
            ))
        ) : (isStudent(user) || isCoach(user)) && (
              <div className="flex items-center justify-center h-full w-full">
                <p className="text-center text-gray-500 text-lg">
                  Тренажёры не найдены
                </p>
              </div>
            )}
        {(isCourseOrganiser(user) || isAdmin(user)) && (
          <button
            onClick={() => onOpen("createSimulator")}
            className="flex bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%] justify-center items-center group"
          >
            <div className="bg-[#ebebeb] group-hover:bg-sky-500 transition-colors rounded-full ">
              <BsPlus
                size={84}
                className="text-[#7f7f7f] group-hover:text-white"
              />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
