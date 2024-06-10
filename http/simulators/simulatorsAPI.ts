import { $authHost } from "..";
import { AxiosResponse } from "axios";
import { ISimulator } from "@/lib/features/simulators/simulatorsSlice";

interface IGetSimulators {
    simulators: ISimulator[];
    simulatorsTotalAmount: number;
  }

export const getSimulators = async ({
    simulatorForSearch,
    page,
    limit,
  }: {
    simulatorForSearch?: string;
    page?: number;
    limit?: number;
  }): Promise<AxiosResponse<IGetSimulators>> => {
    const response = await $authHost.get(
      `/simulator?simulatorForSearch=${simulatorForSearch}&page=${page}&limit=${limit}`
    );
    return response;
  };

export const createSimulator = async ({
  name,
}: {
  name: string;
}): Promise<AxiosResponse<ISimulator>> => {
  const response = await $authHost.post(`/simulator`, {
    name
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
