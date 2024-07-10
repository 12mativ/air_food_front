"use client";
import CourseCard from "@/components/CourseCard";
import LoaderIndicator from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getCourses, getCoursesAdmin } from "@/http/courses/coursesAPI";
import { isAdmin, isCoach, isCourseOrganiser, isStudent } from "@/utils/roles";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { addCourses } from "../../../lib/features/courses/coursesSlice";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.coursesReducer.courses);
  const user = useAppSelector((state) => state.userReducer.user);
  const { onOpen } = useModal();

  useEffect(() => {
    setIsLoading(true);
    if (isAdmin(user)) {
      getCoursesAdmin()
        .then((res) => {
          dispatch(addCourses(res.data));
        })
        .finally(() => setIsLoading(false));
    } else {
      getCourses()
        .then((res) => {
          dispatch(addCourses(res.data));
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const sortedCourses = [...courses].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateA.getTime() - dateB.getTime();
  });

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
            <Button className="mx-1 sm:ml-2 mb-2 w-32 bg-[#cecece] text-[#7f7f7f] hover:bg-sky-500 hover:text-white">
              Все тренеры
            </Button>
          </Link>
          <Link href={"/air-teach/courses"}>
            <Button className="mx-1 ml-12 w-32 bg-[#7f7f7f] text-white hover:bg-sky-500 hover:text-white">
              Все курсы
            </Button>
          </Link>
          <Link href={"/air-teach/competencies"}>
            <Button className="ml-12 w-auto bg-[#cecece] text-[#7f7f7f] hover:bg-sky-500 hover:text-white">
            Список компетенций
            </Button>
          </Link>
        </div>
      )}
      <div className="flex flex-wrap mx-10 mt-6 pt-10">
      {sortedCourses.length > 0 ? (
          sortedCourses.map((course) => ( 
            <CourseCard key={course.id} course={course} />
          ))
        )
          : (isStudent(user) || isCoach(user)) && (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-center text-gray-500 text-lg">
                Курсы не найдены
              </p>
            </div>
          )}
        {(isCourseOrganiser(user) || isAdmin(user)) && (
          <button
            onClick={() => onOpen("createCourse")}
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
