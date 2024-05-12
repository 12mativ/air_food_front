import { ICourse, IEvent } from "@/lib/features/courses/coursesSlise";
import { $authHost } from "..";
import { AxiosResponse } from "axios";

export const createEvent = async ({
  name,
  startDate,
  endDate,
  courseId,
}: {
  name: string;
  startDate: string;
  endDate: string;
  courseId: string;
}): Promise<AxiosResponse<IEvent>> => {
  const response = await $authHost.post(`/event`, {name, startDate, endDate, courseId});
  return response;
};

export const editEvent = async ({
  id,
  name,
  startDate,
  endDate,
  coachId
}: {
  id: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  coachId?: string;
}): Promise<AxiosResponse<IEvent>> => {
  const response = await $authHost.patch(`/event/${id}`, {name, startDate, endDate, coachId});
  return response;
};
