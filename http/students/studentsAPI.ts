import { IStudent } from "@/lib/features/students/studentsSlice";
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
  studentForSearch: string;
  page: number;
  limit: number;
}): Promise<AxiosResponse<IGetStudents>> => {
  const response = await $authHost.get(
    `/student?studentForSearch=${studentForSearch}&page=${page}&limit=${limit}`
  );
  return response;
};
