import { $authHost } from "..";
import { AxiosResponse } from "axios";
import { ICourse } from "../../lib/features/courses/coursesSlice";

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

export const deleteStudentFromCourse = async ({
  courseId,
  studentId,
}: {
  courseId: string;
  studentId: string;
}): Promise<AxiosResponse<ICourse>> => {
  const response = await $authHost.patch(`/course/delete-student/${courseId}`, {
    studentId: studentId,
  });
  return response;
};

export const deleteCourse = async ({
  courseId,
}: {
  courseId: string;
}): Promise<AxiosResponse<ICourse>> => {
  const response = await $authHost.delete(`/course/${courseId}`);
  return response;
};

export const addStudentToCourse = async ({
  courseId,
  studentId,
}: {
  courseId: string;
  studentId: string;
}): Promise<AxiosResponse<ICourse>> => {
  const response = await $authHost.patch(`/course/${courseId}`, {
    studentId: studentId,
  });
  return response;
};
