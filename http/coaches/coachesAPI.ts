import { ICoach } from "@/lib/features/coaches/coachesSlice";
import { AxiosResponse } from "axios";
import { $authHost } from "..";

export const getCoaches = async (): Promise<AxiosResponse<ICoach[]>> => {
  const response = await $authHost.get(`/coach`);
  return response;
};