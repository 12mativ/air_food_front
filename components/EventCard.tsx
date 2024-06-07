import { formateComplexDate } from "@/utils/formateComplexDate";
import Link from "next/link";
import React from "react";
import { IEvent } from "../lib/features/events/eventsSlice";

const EventCard: React.FC<{ event: IEvent }> = ({ event }) => (
  <Link
    href={`/air-teach/events/${event.id}`}
    className="hover:scale-[1.01] transition bg-white rounded-xl p-4 shadow-md m-2 h-40 w-full md:w-[47%] lg:w-[30%] xl:w-[23.5%] 2xl:w-[18.5%]"
    >
    <p className="text-l font-semibold">{event.name}</p>
    <p className="text-sm">
      {formateComplexDate(event.startDate) || ""} - {formateComplexDate(event.endDate) || ""}
    </p>
  </Link>
);

export default EventCard;
