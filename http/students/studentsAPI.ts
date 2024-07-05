import { IStudent, ITimes } from "@/lib/features/students/studentsSlice";
import { $authHost } from "..";
import { AxiosResponse } from "axios";

interface IGetStudents {
  students: IStudent[];
  studentsTotalAmount: number;
}

export const getStudents = async ({
  studentForSearch,
  page,
  limit,
}: {
  studentForSearch?: string;
  page?: number;
  limit?: number;
}): Promise<AxiosResponse<IGetStudents>> => {
  const response = await $authHost.get(
    `/student?studentForSearch=${studentForSearch}&page=${page}&limit=${limit}`
  );
  return response;
};

export const getStudentsOnCourse = async ({courseId}: {courseId: string}) => {
  const response = await $authHost.get(`/student/${courseId}`);

  return response;
}

export const editStudent = async ({
  id,
  firstName,
  lastName,
  middleName,
  birthDate,
  courseId,
  times,
}: {
  id: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: string;
  courseId?: string;
  times?: ITimes[];
}): Promise<AxiosResponse<IStudent>> => {
  const response = await $authHost.patch(`/student/${id}`, {firstName, lastName, middleName, birthDate, courseId, times});
  return response; 
};
