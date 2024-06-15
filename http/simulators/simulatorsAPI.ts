import { $authHost } from "..";
import { AxiosResponse } from "axios";
import { ISimulator } from "@/lib/features/simulators/simulatorsSlice";

export const getSimulatorsOnCourse = async ({
  courseId,
}: {
  courseId: string;
}) => {
  const response = await $authHost.get(`/simulator/${courseId}`);
  return response.data;
};

export const createSimulator = async ({
  name,
  courseId,
}: {
  name: string;
  courseId: string;
}): Promise<AxiosResponse<ISimulator>> => {
  const response = await $authHost.post(`/simulator`, {
    name,
    courseId,
  });
  return response;
};

export const deleteSimulator = async ({
  simulatorId,
}: {
  simulatorId: string;
}): Promise<AxiosResponse<ISimulator>> => {
  const response = await $authHost.delete(`/simulator/${simulatorId}`);
  return response;
};
