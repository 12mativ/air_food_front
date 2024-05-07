'use client'
import React, { useState } from 'react';
import { makeAuth } from "@/lib/features/user/userSlice";
import { LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { addCourses, ICourse } from "@/lib/features/courses/coursesSlise";
import CourseCard from "@/components/CourseCard";
import { LiaUserCircleSolid } from "react-icons/lia";

const courses: ICourse[] = [
    {
        id: "1",
        name: "Course 1",
        startDate: "01.04.2024",
        endDate: "01.05.2024"
    },
    {
        id: "2",
        name: "Course 2",
        startDate: "01.06.2024",
        endDate: "01.07.2024"
    }
];

const Page = () => {
    const user = useAppSelector(state => state.userReducer.user)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        console.log(123)
        localStorage.removeItem("token")
        dispatch(makeAuth({email: "", roles: [], isAuth: false}))
    }

    

    return (
        <div className="w-full h-full items-center bg-[#ebebeb]">
            <div className="fixed top-0 left-0 w-full z-10 h-16 bg-[#7f7f7f]">
                <div className='absolute top-1/2 transform -translate-y-1/2 left-5 text-white'>
                    <LogOut onClick={handleLogout} size={25} className="cursor-pointer" />
                </div>
                <div className='flex flex-row absolute top-1/2 transform -translate-y-1/2 right-5 text-white'>
                    <LiaUserCircleSolid size={25} />
                    {user.email}
                </div>
            </div>
            <div className="flex flex-wrap mx-10 mt-10 pt-10">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

export default Page;
