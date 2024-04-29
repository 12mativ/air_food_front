'use client'
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getStudents } from "@/http/students/studentsAPI";
import { addStudents, IStudent } from "@/lib/features/students/studentsSlice";
import { makeAuth } from "@/lib/features/user/userSlice";
import { LogOut } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const StudentCard: React.FC<{ student: IStudent }> = ({ student }) => (
    <div className="bg-white rounded-xl p-4 shadow-md m-2 h-40 sm:w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]">
        <p className="text-l font-semibold">{student.email}</p>
        <p className="text-sm">{student.firstName} {student.lastName}</p>
    </div>
);

const Page = () => {
    const [studentForSearch, setStudentForSearch] = useState("");
    const students = useAppSelector(state => state.studentsReducer.students)
    const dispatch = useAppDispatch();

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setStudentForSearch(e.target.value);
    }

    const handleLogout = () => {
        console.log(123)
        localStorage.removeItem("token")
        dispatch(makeAuth({email: "", roles: [], isAuth: false}))
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getStudents({studentForSearch: studentForSearch, page: 1, limit: 10})
            dispatch(addStudents(response.data.students))
        }

        const timer = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(timer);
    }, [studentForSearch]);

    return (
        <div className="w-full h-full items-center">
            {/* <div className="flex flex-wrap ml-20 px-4 sm:px-6 lg:px-8 w-full mt-10"> */}
            <div className="fixed top-0 left-0 w-full z-10">
                <LogOut onClick={handleLogout} size={30} className="cursor-pointer" />
                <div className=" mx-10 mt-10 py-4">
                    <form className="relative ">
                        <input className="shadow-lg rounded-xl sm:w-full md:w-[40%] lg:h-8 xl:w-[28%] 2xl:w-[20%] sm:h-12 pl-8 h-8" type="text" onChange={(e) => handleInputChange(e)} placeholder="Search students" />
                        <div className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400">
                            <IoIosSearch />
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex flex-wrap mx-10 mt-20 pt-10">

                {students.map((student) => (
                    <StudentCard key={student.id} student={student} />
                ))}

            </div>
        </div>
    );
};

export default Page;
