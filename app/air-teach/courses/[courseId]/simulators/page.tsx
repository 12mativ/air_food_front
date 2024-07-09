"use client";

import SimulatorCard from "@/components/SimulatorCard";
import LoaderIndicator from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getSimulatorsOnCourse } from "@/http/simulators/simulatorsAPI";
import { isAdmin, isCourseOrganiser } from "@/utils/roles";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { addSimulators } from "@/lib/features/simulators/simulatorsSlice";
import { useParams } from "next/navigation";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const dispatch = useAppDispatch();
  const simulators = useAppSelector(
    (state) => state.simulatorsReducer.simulators
  );
  const user = useAppSelector((state) => state.userReducer.user);
  const { onOpen } = useModal();

  useEffect(() => {
    const fetchSimulators = async () => {
      setIsLoading(true);
      try {
        if (isAdmin(user) || isCourseOrganiser(user)) {
          const res = await getSimulatorsOnCourse({ courseId: params.courseId as string });
          dispatch(addSimulators(res));
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimulators();
  }, [dispatch, params.courseId, user]);

  return (
    <div className="w-full h-full items-center bg-[#ebebeb]">
      <div className="flex flex-wrap mx-10 mt-6 pt-10">
        {isLoading ? (
          <LoaderIndicator />
        ) : (
          simulators?.map((simulator) => (
            <SimulatorCard key={simulator.id} simulator={simulator} />
          ))
        )}
        {(isCourseOrganiser(user) || isAdmin(user)) && (
          <button
            onClick={() => onOpen("createSimulator")}
            className="flex bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%] justify-center items-center group"
          >
            <div className="bg-[#ebebeb] group-hover:bg-sky-500 transition-colors rounded-full ">
              <BsPlus
                size={84}
                className="text-[#7f7f7f] group-hover:text-white"
              />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;