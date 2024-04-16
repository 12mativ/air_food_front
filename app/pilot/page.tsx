'use client'
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface IPilot {
    username: string;
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    userId: string;
}

const PilotCard: React.FC<{ pilot: IPilot }> = ({ pilot }) => (
    <div className="bg-white rounded-xl p-4 shadow-md m-2 h-40 sm:w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]">
        <p className="text-l font-semibold">{pilot.username}</p>
        <p className="text-sm">{pilot.firstName} {pilot.lastName}</p>
        <p className="text-sm">Age: {pilot.age}</p>
    </div>
);

const Page = () => {
    const [pilotForSearch, setPilotForSearch] = useState("");
    const [pilots, setPilots] = useState<IPilot[]>([]);

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setPilotForSearch(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:3000/pilot/find?pilotForSearch=${pilotForSearch}`, { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NGIxZjQyMy05NDdmLTRlZjUtOGY3OC04Zjk2NzhmNzJmYTIiLCJ1c2VybmFtZSI6ImFydGVtIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzEzMjkzNzA1LCJleHAiOjE3MTMyOTczMDV9.a0ioMGwwZx8mR-irvx96qY4WXrWtLe8b51qRinyJFHc` } });
            setPilots(response.data);
        }

        const timer = setTimeout(() => {
            fetchData();
        }, 3000);

        return () => clearTimeout(timer);
    }, [pilotForSearch]);

    return (
        <div className=" w-full h-full items-center">
            {/* <div className="flex flex-wrap ml-20 px-4 sm:px-6 lg:px-8 w-full mt-10"> */}
            <div className="fixed top-0 left-0 w-full z-10">
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

                {pilots.map((pilot) => (
                    <PilotCard key={pilot.id} pilot={pilot} />
                ))}

            </div>
        </div>
    );
};

export default Page;
