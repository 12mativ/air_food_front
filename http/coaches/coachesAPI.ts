import { ICoach } from "@/lib/features/coaches/coachesSlice";
import { AxiosResponse } from "axios";
import { $authHost } from "..";

interface IGetCoaches {
  coaches: ICoach[];
  coachesTotalAmount: number;
}

export const getCoaches = async ({
  coachForSearch,
  page,
  limit,
}: {
  coachForSearch?: string;
  page?: number;
  limit?: number;
}): Promise<AxiosResponse<IGetCoaches>> => {
  const response = await $authHost.get(
    `/coach?coachForSearch=${coachForSearch}&page=${page}&limit=${limit}`
  );
  return response;
};

export const editCoach = async ({
  id,
  firstName,
  lastName,
  middleName
}: {
  id: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
}): Promise<AxiosResponse<ICoach>> => {
  const response = await $authHost.patch(`/coach/${id}`, {firstName, lastName, middleName});
  return response; 
};