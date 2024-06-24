import { useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { isAdmin, isCourseOrganiser } from "@/utils/roles";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { IEvent } from "../lib/features/events/eventsSlice";
import { DeleteEventModal } from "./modals/delete-event-modal";


const EventCard: React.FC<{ event: IEvent }> = ({ event }) => {
  const { onOpen } = useModal();
  const user = useAppSelector((state) => state.userReducer.user);

  const handleDelete = (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen("removeEvent", { eventId: event.id, eventName: event.name });
  };
  return (
    <>
      <Link
        href={`/air-teach/events/${event.id}`}
        className="hover:scale-[1.01] relative transition bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]"
      >
        {(isCourseOrganiser(user) || isAdmin(user)) && (
          <div onClick={handleDelete}>
            <X
              size={20}
              className="absolute right-2 text-red-500 transition cursor-pointer"
            />
          </div>
        )}
        <p className="text-l font-semibold">{event.name}</p>
        <p className="text-sm">
          {formateComplexDate(event.startDate) || ""} - {formateComplexDate(event.endDate) || ""}
        </p>
      </Link>
      <DeleteEventModal />
    </>
  );
}

export default EventCard;
