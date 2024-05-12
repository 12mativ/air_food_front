import { IUser } from "@/lib/features/user/userSlice";

export const isAdmin = (user: IUser) => {
  return user.roles.includes("ADMIN")
}

export const isStudent = (user: IUser) => {
  return user.roles.includes("STUDENT")
}

export const isCourseOrganiser = (user: IUser) => {
  return user.roles.includes("COURSE_ORGANISER")
}

export const isCoach = (user: IUser) => {
  return user.roles.includes("COACH")
}