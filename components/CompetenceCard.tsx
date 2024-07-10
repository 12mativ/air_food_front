import { useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { isAdmin, isCourseOrganiser } from "@/utils/roles";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ICompetence } from "@/lib/features/competencies/competenciesSlice";
import { DeleteCompetenceModal } from "./modals/delete-competence-modal";
import { Button } from "./ui/button";
import { TfiTrash } from "react-icons/tfi";

const CompetenceCard: React.FC<{ competence: ICompetence }> = ({ competence }) => {
  const { onOpen } = useModal();
  const user = useAppSelector((state) => state.userReducer.user);

  const handleDelete = (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen("removeCompetence", { competenceId: competence.id, competenceName: competence.name });
  };

  return (
    <>
      <div
        className="relative hover:scale-[1.01] transition bg-white rounded-xl p-4 shadow-md 2xl:w-[50.5%]"
      >
        {(isCourseOrganiser(user) || isAdmin(user)) && (
          <div onClick={handleDelete}>
            <TfiTrash
              size={20}
              className="absolute right-2 text-red-500 hover:scale-[1.1] transition cursor-pointer"
            />
          </div>
        )}
        <p className="text-l font-semibold">{competence.name}</p>
      </div>
      <DeleteCompetenceModal />
    </>
  );
};

export default CompetenceCard;