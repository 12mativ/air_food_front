"use client";

import CoachCard from "@/components/CoachCard";
import LoaderIndicator from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getCoaches } from "@/http/coaches/coachesAPI";
import { addCoaches, ICoach } from "@/lib/features/coaches/coachesSlice";
import { isAdmin } from "@/utils/roles";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coachForSearch, setCoachForSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const coaches = useAppSelector((state) => state.coachesReducer.coaches);
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const limit = 8;

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCoachForSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchCoaches = async () => {
    const response = await getCoaches({
      coachForSearch: coachForSearch,
      page: currentPage,
      limit: limit,
    });
    dispatch(addCoaches(response.data.coaches));
    setTotalPages(Math.ceil(response.data.coachesTotalAmount / limit));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCoaches();
    }, 1000);

    return () => clearTimeout(timer);
  }, [coachForSearch]);

  useEffect(() => {
    fetchCoaches();
  }, [currentPage]);

  if (isLoading) {
    return <LoaderIndicator />;
  }

  return (
    <div className="w-full h-full items-center bg-[#ebebeb]">
      {isAdmin(user) && (
        <div className="flex flex-wrap justify-center sm:justify-normal mx-1 sm:mx-10 w-full">
          <Link href={"/air-teach/students"}>
            <Button className="mx-1 mb-2 w-32 bg-[#cecece] text-[#7f7f7f] hover:bg-sky-500 hover:text-white">
              Все студенты
            </Button>
          </Link>
          <Link href={"/air-teach/coaches"}>
            <Button className="mx-1 mb-2 w-32 bg-[#7f7f7f] text-white hover:bg-sky-500 hover:text-white">
              Все тренеры
            </Button>
          </Link>
          <Link href={"/air-teach/courses"}>
            <Button className="mx-1 w-32 bg-[#cecece] text-[#7f7f7f] hover:bg-sky-500 hover:text-white">
              Все курсы
            </Button>
          </Link>
        </div>
      )}
      <div className="mt-4 mx-3 sm:mx-10 relative">
        <input
          className="shadow-lg rounded-xl w-full md:w-[40%] lg:h-10 xl:w-[28%] 2xl:w-[20%] h-12 pl-8 md:h-8"
          type="text"
          onChange={(e) => handleInputChange(e)}
          placeholder="Поиск тренера"
        />
        <IoIosSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      <div className="flex flex-wrap mx-1 sm:mx-10 mt-4">
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
      <div className="fixed bottom-0 left-0 w-full p-4 shadow-lg bg-[#ebebeb]">
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
