"use client";

import EventCard from "@/components/EventCard";
import StudentCard from "@/components/StudentCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getStudents } from "@/http/students/studentsAPI";
import { addStudents } from "@/lib/features/students/studentsSlice";
import { formateComplexDate } from "@/utils/formateComplexDate";
import { isAdmin, isCourseOrganiser } from "@/utils/roles";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { onOpen } = useModal();
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const params = useParams();
  const course = useAppSelector((state) =>
    state.coursesReducer.courses.find((course) => course.id === params.courseId)
  );

  useEffect(() => {
    if (isAdmin(user)) {
      getStudents({ studentForSearch: "" }).then((res) => {
        dispatch(addStudents(res.data.students));
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col w-full justify-center items-center gap-y-11">
        <div className="flex items-center gap-x-3">
          <p className="text-3xl font-bold text-sky-500">
            Курс "{course?.name}"
          </p>
          {/* <Pencil className="text-sky-500 cursor-pointer" onClick={() => {
            console.log('123')
            onOpen("editStudent", {student: student})
            }} /> */}
        </div>
        <div className="flex flex-row w-full items-center gap-x-20">
          <div className="flex flex-col gap-y-3 w-full justify-center items-center text-gray-500 font-semibold">
            <p>
              Дата начала:{" "}
              {course?.startDate
                ? formateComplexDate(course.startDate)
                : "Не задано"}
            </p>
            <p>
              Дата завершения:{" "}
              {course?.endDate
                ? formateComplexDate(course.endDate)
                : "Не задано"}
            </p>
            <p>Мероприятия:</p>
            <div className="flex flex-wrap w-full justify-center mx-5 md:mx-10">
              {course?.events?.map((event) => (
                <EventCard event={event} />
              ))}
            </div>
            {isAdmin(user) && (
              <>
                <p>Студенты:</p>
                <div className="flex flex-wrap w-full justify-center mx-5 md:mx-10">
                  {course?.students?.map((student) => (
                    <StudentCard key={student.id} student={student} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          {(isAdmin(user) || isCourseOrganiser(user)) && (
            <Button
              className="bg-sky-500 hover:bg-sky-400"
              onClick={() => onOpen("createEvent", { courseId: course!.id })}
            >
              Добавить мероприятие на курс
            </Button>
          )}
          {isAdmin(user) && (
            <Button
              className="bg-sky-500 hover:bg-sky-400"
              onClick={() =>
                onOpen("addStudentToCourse", { courseId: course!.id })
              }
            >
              Добавить студента на курс
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
