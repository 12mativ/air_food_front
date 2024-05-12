import { IEvent } from "@/lib/features/courses/coursesSlise";
import { formateComplexDate } from "@/utils/formateComplexDate";
import Link from "next/link";
import React from "react";

const EventCard: React.FC<{ event: IEvent }> = ({ event }) => (
  <Link
    href={`/air-teach/events/${event.id}`}
    className="hover:scale-[1.01] transition bg-white rounded-xl p-4 shadow-md m-2 h-40"
  >
    <p className="text-l font-semibold">{event.name}</p>
    <p className="text-sm">
      {formateComplexDate(event.startDate) || ""} - {formateComplexDate(event.endDate) || ""}
    </p>
  </Link>
);

export default EventCard;
