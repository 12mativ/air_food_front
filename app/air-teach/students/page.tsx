"use client";

import StudentCard from "@/components/StudentCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getStudents } from "@/http/students/studentsAPI";
import { addStudents, IStudent } from "@/lib/features/students/studentsSlice";
import { isAdmin, isStudent } from "@/utils/roles";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Pagination from "@/components/Pagination";

const Page = () => {
  const [studentForSearch, setStudentForSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const students = useAppSelector((state) => state.studentsReducer.students);
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const limit = 8;

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setStudentForSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getStudents({
        studentForSearch: studentForSearch,
        page: currentPage,
        limit: limit,
      });
      dispatch(addStudents(response.data.students));
      setTotalPages(Math.ceil(response.data.studentsTotalAmount / limit));
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [studentForSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getStudents({
        studentForSearch: studentForSearch,
        page: currentPage,
        limit: limit,
      });
      dispatch(addStudents(response.data.students));
      setTotalPages(Math.ceil(response.data.studentsTotalAmount / limit));
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isStudent(user)) {
    return redirect("/air-teach/lk");
  }

  return (
    <div className="w-full h-full items-center bg-[#ebebeb]">
      {isAdmin(user) && (
        <>
          <Link href={"/air-teach/students"}>
            <Button className="ml-12 w-32 bg-[#7f7f7f] text-white hover:bg-sky-500">
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
        </>
      )}
      <div className="mt-4 mx-10 relative">
        <input
          className="shadow-lg rounded-xl w-full md:w-[40%] lg:h-10 xl:w-[28%] 2xl:w-[20%] h-12 pl-8 md:h-8"
          type="text"
          onChange={(e) => handleInputChange(e)}
          placeholder="Поиск студента"
        />
        <IoIosSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      <div className="flex flex-wrap mx-10 pt-2 pb-20">
        {students.length > 0 ? (
          students.map((student: IStudent) => (
            <StudentCard key={student.id} student={student} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-center text-gray-500 text-lg">
              Студенты не найдены
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
