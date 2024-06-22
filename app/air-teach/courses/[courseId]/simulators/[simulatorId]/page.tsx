"use client";

import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useParams } from "next/navigation";
import { Pencil } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

const Page = () => {
  const { onOpen } = useModal();
  const params = useParams();
  const simulator = useAppSelector((state) =>
    state.simulatorsReducer.simulators.find(
      (simulator) => simulator.id === params.simulatorId
    )
  );

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-y-11">
        <div className="flex items-center gap-x-3">
          <p className="text-3xl font-bold text-sky-500">Общая информация</p>
          <Pencil
            className="text-sky-500 cursor-pointer"
            onClick={() => {
              onOpen("editSimulator", { simulator: simulator });
            }}
          />
        </div>
        <div className="flex flex-row items-center gap-x-20">
          <div className="flex flex-col gap-y-3 text-gray-500 font-semibold">
            <p>Название: {simulator?.name ? simulator.name : "Не задано"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
