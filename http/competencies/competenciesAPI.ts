import { AxiosResponse } from "axios";
import { $authHost } from "..";
import { ICompetence } from "@/lib/features/competencies/competenciesSlice";

export const getCompetencies = async (): Promise<AxiosResponse<ICompetence>> => {
  const response = await $authHost.get(
    `/competence`
  );
  return response;
};

// export const getCompetence = async ({ competensId }: { competensId: string }): Promise<AxiosResponse<ICompetence>> => {
//   const response = await $authHost.get(
//     `/competence/${competensId}`
//   );
//   return response;
// };

export const createCompetence = async ({
  name,
}: {
  name: string;
}): Promise<AxiosResponse<ICompetence>> => {
  const response = await $authHost.post(`/competence`, {
    name
  });
  return response;
};

export const deleteCompetence = async ({
  competenceId,
}: {
  competenceId: string;
}): Promise<AxiosResponse<ICompetence>> => {
  const response = await $authHost.delete(`/competence/${competenceId}`);
  return response;
};

export const addCompetenceToStudent = async ({
  competenceId,
  studentId,
}: {
  competenceId: string;
  studentId: string;
}): Promise<AxiosResponse<ICompetence>> => {
  const response = await $authHost.post(`/student-competence-characteristic`, {
    studentId: studentId,
    competenceId: competenceId
  });
  return response;
};

export const removeCompetenceFromStudent = async ({
    studentId,
  }: {
    studentId: string;
  }): Promise<AxiosResponse<ICompetence>> => {
    const response = await $authHost.delete(`/student-competence-characteristic/${studentId}`)
    return response;
  };