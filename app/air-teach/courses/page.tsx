"use client";
import React, { useEffect, useState } from "react";
import { makeAuth } from "@/lib/features/user/userSlice";
import { LogOut } from "lucide-react";
import { LiaUserCircleSolid } from "react-icons/lia";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { addCourse, addCourses, ICourse } from "@/lib/features/courses/coursesSlise";
import CourseCard from "@/components/CourseCard";
import Header from "@/components/header";
import { redirect } from "next/dist/server/api-utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsPlus } from "react-icons/bs";
import { useModal } from "@/hooks/use-modal-store";
import { useParams } from "next/navigation";
import { getCourses } from "@/http/courses/coursesAPI";

const Page = () => {
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
    getCourses().then(res => {
      dispatch(addCourses(res.data))
    })
  },[])
  
  return (
    <div className="w-full h-full items-center bg-[#ebebeb]">
      <Header />
      {user.roles.includes("ADMIN") && (
        <Link href={"/air-teach/students"}>
          <Button className="mt-20 ml-12 bg-[#7f7f7f] text-white hover:bg-sky-500">
            Все студенты
          </Button>
        </Link>
      )}
      <div className="flex flex-wrap mx-10 mt-10 pt-10">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        {user.roles.includes("COURSE_ORGANISER") || user.roles.includes("ADMIN") && (
          <button onClick={() => onOpen("createCourse")} className="flex bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%] justify-center items-center group">
            <div className="bg-[#ebebeb] group-hover:bg-sky-500 transition-colors rounded-full " >
              <BsPlus size={84} className="text-[#7f7f7f] group-hover:text-white"/>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
