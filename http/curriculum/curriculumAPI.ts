import { $authHost } from '..';

interface ICreateCurriculum {
  studentId: string;
  curriculumId: string;
  schedule: {day: string, time: {startTime: number, endTime: number}[]}[]
}

export const createCurriculum = async ({studentId, curriculumId, schedule}: ICreateCurriculum) => {
  const response = await $authHost.post(`/curriculum`, {studentId, curriculumId, schedule});

  return response;
}