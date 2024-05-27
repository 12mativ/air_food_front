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

  const renderPageButtons = () => {
    const pageButtons = [];
    let startPage, endPage;

    if (totalPages <= 9) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 5) {
        startPage = 1;
        endPage = 9;
      } else if (currentPage >= totalPages - 4) {
        startPage = totalPages - 8;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 4;
      }
    }

    // Добавляем кнопку "предыдущая" страницы, если это не первая страница
    if (currentPage > 1) {
      pageButtons.push(
        <button
          key="prev"
          className="px-4 py-2 mx-1 rounded-xl bg-[#cecece]"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>
      );
    }

    // Добавляем кнопку первой страницы
    if (startPage > 1) {
      pageButtons.push(
        <button
          key={1}
          className={`px-4 py-2 mx-1 rounded-xl ${
            1 === currentPage ? "bg-[#7f7f7f] text-white" : "bg-[#cecece]"
          }`}
          onClick={() => handlePageChange(1)}
        >
          {1}
        </button>
      );
      if (startPage > 2) {
        pageButtons.push(
          <span key="start-dots" className="px-4 py-2">
            ...
          </span>
        );
      }
    }

    // Добавляем кнопки между startPage и endPage
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`px-4 py-2 mx-1 rounded-xl ${
            i === currentPage ? "bg-[#7f7f7f] text-white" : "bg-[#cecece]"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    // Добавляем кнопку последней страницы
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <span key="end-dots" className="px-4 py-2">
            ...
          </span>
        );
      }
      pageButtons.push(
        <button
          key={totalPages}
          className={`px-4 py-2 mx-1 rounded-xl ${
            totalPages === currentPage
              ? "bg-[#7f7f7f] text-white"
              : "bg-[#cecece]"
          }`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Добавляем кнопку "следующая" страницы, если это не последняя страница
    if (currentPage < totalPages) {
      pageButtons.push(
        <button
          key="next"
          className="px-4 py-2 mx-1 rounded-xl bg-[#cecece]"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      );
    }

    return pageButtons;
  };

  if (isStudent(user)) {
    return redirect("/air-teach/lk");
  }

  return (
    <div className="w-full h-full items-center bg-[#ebebeb]">
      {isAdmin(user) && (
        <Link href={"/air-teach/students"}>
          <Button className="ml-12 w-32 bg-[#7f7f7f] text-white hover:bg-sky-500">
            Все студенты
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
        <div className="flex justify-center">{renderPageButtons()}</div>
      </div>
    </div>
  );
};

export default Page;