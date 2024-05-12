import { ICoach } from "@/lib/features/coaches/coachesSlice";
import Link from "next/link";
import React from "react";

const CoachCard: React.FC<{ coach: ICoach }> = ({ coach }) => (
    <Link href={`/air-teach/coaches/${coach.id}`} className="hover:scale-[1.01] transition bg-white rounded-xl p-4 shadow-md m-2 h-40">
        <p className="text-l font-semibold">{coach.email}</p>
        <p className="text-sm">{coach.firstName} {coach.lastName}</p>
    </Link>
);

export default CoachCard;