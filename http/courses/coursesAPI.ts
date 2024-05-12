import { ICourse } from "@/lib/features/courses/coursesSlise";
import { $authHost } from "..";
import { AxiosResponse } from "axios";

export const getCourses = async (): Promise<AxiosResponse<ICourse[]>> => {
    const response = await $authHost.get(
      `/course`
    );
    return response;
};

export const getCoursesAdmin = async (): Promise<AxiosResponse<ICourse[]>> => {
  const response = await $authHost.get(
    `/course/admin`
  );
  return response;
};

export const getCourse = async ({courseId}: {courseId: string}): Promise<AxiosResponse<ICourse>> => {
  const response = await $authHost.get(
    `/course/${courseId}`
  );
  return response;
};

export const createCourse = async ({
  name,
}: {
  name: string;
}): Promise<AxiosResponse<ICourse>> => {
  const response = await $authHost.post(`/course`, {
    name
  });
  return response;
};
