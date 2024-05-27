"use client";

import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getStudents } from "@/http/students/studentsAPI";
import { addStudents, IStudent } from "@/lib/features/students/studentsSlice";
import { makeAuth } from "@/lib/features/user/userSlice";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import StudentCard from "@/components/StudentCard";
import { LiaUserCircleSolid } from "react-icons/lia";
import Header from "@/components/Header";
import { isStudent } from "@/utils/roles";

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
    <div className="w-full h-full items-center p-5">
      <div>
        <form className="hover:text-sky-600">
          <input
            className="shadow-lg rounded-xl w-full md:w-[40%] lg:h-10 xl:w-[28%] 2xl:w-[20%] h-12 pl-4 md:h-8"
            type="text"
            onChange={(e) => handleInputChange(e)}
            placeholder="Поиск студента"
          />
        </form>
      </div>
      <div className="flex flex-wrap mx-10 pt-32 pb-20">
        {students.map((student: IStudent) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full p-4 shadow-lg bg-[#ebebeb]">
        <div className="flex justify-center">{renderPageButtons()}</div>
      </div>
    </div>
  );
};

export default Page;
