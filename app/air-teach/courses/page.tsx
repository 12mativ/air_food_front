"use client";
import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import LoaderIndicator from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getCourses, getCoursesAdmin } from "@/http/courses/coursesAPI";
import { addCourses } from "@/lib/features/courses/coursesSlise";
import { isAdmin, isCourseOrganiser } from "@/utils/roles";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.coursesReducer.courses);
  const user = useAppSelector((state) => state.userReducer.user);
  const { onOpen } = useModal();
  const params = useParams();
  const student = useAppSelector((state) =>
    state.studentsReducer.students.find(
      (student) => student.id === params.studentId
    )
  );
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

  if (isLoading) {
    return <LoaderIndicator />;
  }

  return (
    <div className="w-full h-full items-center bg-[#ebebeb]">
      {isAdmin(user) && (
        <Link href={"/air-teach/students"}>
          <Button className="ml-12 bg-[#7f7f7f] text-white hover:bg-sky-500">
            Все студенты
          </Button>
        </Link>
      )}
      <div className="flex flex-wrap mx-10 mt-10 pt-10">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
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
