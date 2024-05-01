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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
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
            const response = await getStudents({studentForSearch: studentForSearch, page: currentPage, limit: 10})
            dispatch(addStudents(response.data.students));
            setTotalPages(Math.ceil(response.data.studentsTotalAmount / 10));
        }

        const timer = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(timer);
    }, [studentForSearch, currentPage]);

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
                    className="px-4 py-2 mx-1 rounded-xl bg-gray-300"
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
                    className={`px-4 py-2 mx-1 rounded-xl ${1 === currentPage ? 'bg-gray-400 text-white' : 'bg-gray-300'}`}
                    onClick={() => handlePageChange(1)}
                >
                    {1}
                </button>
            );
            if (startPage > 2) {
                pageButtons.push(<span key="start-dots" className="px-4 py-2">...</span>);
            }
        }

        // Добавляем кнопки между startPage и endPage
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    className={`px-4 py-2 mx-1 rounded-xl ${i === currentPage ? 'bg-gray-400 text-white' : 'bg-gray-300'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        // Добавляем кнопку последней страницы
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageButtons.push(<span key="end-dots" className="px-4 py-2">...</span>);
            }
            pageButtons.push(
                <button
                    key={totalPages}
                    className={`px-4 py-2 mx-1 rounded-xl ${totalPages === currentPage ? 'bg-gray-400 text-white' : 'bg-gray-300'}`}
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
                    className="px-4 py-2 mx-1 rounded-xl bg-gray-300"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    &gt;
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <div className="w-full h-full items-center bg-[#ebebeb]">
            {/* <div className="flex flex-wrap ml-20 px-4 sm:px-6 lg:px-8 w-full mt-10"> */}
            <div className="fixed top-0 left-0 w-full z-10 bg-[#ebebeb]">
                <LogOut onClick={handleLogout} size={30} className="cursor-pointer" />
                <div className=" mx-10 py-4">
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
            <div className="fixed bottom-0 left-0 w-full p-4 shadow-lg bg-transparent bg-[#ebebeb]">
                <div className="flex justify-center">
                    {renderPageButtons()}
                </div>
            </div>
        </div>
    );
};

export default Page;
