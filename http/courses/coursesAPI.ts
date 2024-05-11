import { ICourse } from "@/lib/features/courses/coursesSlise";
import { $authHost } from "..";
import { AxiosResponse } from "axios";

export const getCourses = async (): Promise<AxiosResponse<ICourse[]>> => {
    const response = await $authHost.get(
      `/course`
    );
    return response;
  };

export const createCourse = async ({
  name,
  startDate,
  endDate,
}: {
  name: string;
  startDate: string;
  endDate: string;
}): Promise<AxiosResponse<ICourse>> => {
  const response = await $authHost.post(`/course`, {
    name,
    startDate,
    endDate,
  });
  return response;
};
