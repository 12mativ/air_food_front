"use client"

import { IoPersonSharp } from "react-icons/io5";
import { useAppSelector } from "@/hooks/redux-hooks"
import { useParams } from "next/navigation"
import Header from "@/components/header";

const Page=()=>{
    const params = useParams()
    console.log(params.studentId)
    const student = useAppSelector(state =>state.studentsReducer.students.find(student =>student.id===params.studentId))
    console.log(student)
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Header />
            <div className="flex flex-col items-center gap-y-11">
                <p className="text-3xl font-bold text-sky-500">
                    Общая информация
                </p>
                <div className="flex flex-row items-center gap-x-20">
                    <IoPersonSharp className="text-9xl text-gray-400" />
                    <div className="flex flex-col gap-y-3 text-gray-500 font-semibold">
                        <p>Имя: {student?.firstName ? student.firstName : "Не задано"}</p>
                        <p>Фамилия: {student?.lastName ? student.lastName : "Не задано"}</p>
                        <p>Возраст: {student?.birthDate ? student.birthDate : "Не задано"}</p>
                        <p>Почта: {student?.email}</p>
                        <p>Компетенция: Не задано</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page