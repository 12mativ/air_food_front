import { $authHost } from "..";
import { AxiosResponse } from "axios";
import { IEvent } from "../../lib/features/events/eventsSlice";

export const getEvents = async ({courseId}: {courseId: string}) => {
  const response = await $authHost.get(`/event/${courseId}`);

  return response;
}


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
