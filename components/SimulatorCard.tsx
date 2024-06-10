import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { isAdmin, isCourseOrganiser } from "@/utils/roles";
import { useAppSelector } from "@/hooks/redux-hooks";
import { ISimulator } from "@/lib/features/simulators/simulatorsSlice";
import { DeleteSimulatorModal } from "./modals/delete-simulator-modal";

const SimulatorCard: React.FC<{ simulator: ISimulator }> = ({ simulator }) => {
  const { onOpen } = useModal();
  const user = useAppSelector((state) => state.userReducer.user);

  const handleDelete = (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen("removeSimulator", { simulatorId: simulator.id });
  };

  return (
    <>
      <Link
        href={`/air-teach/simulators/${simulator.id}`}
        className="relative hover:scale-[1.01] transition bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]"
      >
        {(isCourseOrganiser(user) || isAdmin(user)) && (
          <div onClick={handleDelete}>
            <X
              size={20}
              className="absolute right-2 text-red-500 hover:scale-[1.1] transition cursor-pointer"
            />
          </div>
        )}
        <p className="text-l font-semibold">{simulator.name}</p>
      </Link>
      <DeleteSimulatorModal />
    </>
  );
};

export default SimulatorCard;