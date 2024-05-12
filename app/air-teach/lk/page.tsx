'use client'
import React, { useState } from 'react';
import { makeAuth } from "@/lib/features/user/userSlice";
import { LogOut } from "lucide-react";
import { LiaUserCircleSolid } from "react-icons/lia";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { addCourses, ICourse } from "@/lib/features/courses/coursesSlise";
import CourseCard from "@/components/CourseCard";
import Header from '@/components/header';


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
    return (
        <div className="w-full h-full items-center bg-[#ebebeb]">
            <Header/>
            <div className="flex flex-wrap mx-10 mt-10 pt-10">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

export default Page;
