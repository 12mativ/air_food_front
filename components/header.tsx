'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { makeAuth } from "@/lib/features/user/userSlice";
import { LogOut } from "lucide-react"
import { LiaUserCircleSolid } from "react-icons/lia"
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()
    const dispatch = useAppDispatch();   
    const user = useAppSelector(state => state.userReducer.user)
    
    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch(makeAuth({email: "", roles: [], isAuth: false}))
    }

    return (
        <div className="fixed top-0 left-0 w-full z-10 h-16 bg-stone-300 ">
            <div className='absolute top-1/2 transform -translate-y-1/2 right-5 text-sky-500 hover:text-sky-600'>
                <LogOut onClick={handleLogout} size={25} className="cursor-pointer" />
            </div>
            <div className="flex flex-row absolute top-1/2 transform -translate-y-1/2 right-16 text-sky-500 gap-x-4">
                <LiaUserCircleSolid size={25} />
                {user.email}
            </div>
            <div className="flex flex-row absolute top-1/2 transform -translate-y-1/2 left-16 text-sky-500 gap-x-4 text-3xl font-extrabold">
                <p>AirTeach</p>
            </div>
            <button type="button" onClick={() => router.back()}>
                <IoMdArrowBack className="flex flex-row absolute top-1/2 transform -translate-y-1/2 left-5 text-sky-500 gap-x-4 text-3xl font-extrabold hover:text-sky-600" />
            </button>
        </div>
    )
}

export default Header