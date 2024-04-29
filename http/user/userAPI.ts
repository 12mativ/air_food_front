import { $authHost, $host } from "..";
import { jwtDecode } from "jwt-decode";

export type RolesType = "ADMIN" | "COURSE_ORGANISER" | "COACH" | "STUDENT";

export type JwtType = {
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
  email?: string;
  roles?: RolesType[];
};

export const register = async ({
  email,
  password,
  roles,
}: {
  email: string;
  password: string;
  roles: RolesType[];
}): Promise<JwtType> => {
  const response = await $host.post("/auth/register", {
    email,
    password,
    roles: roles,
  });

  //@ts-ignore
  localStorage.setItem("token", response.data.jwt);
  //@ts-ignore
  return { ...jwtDecode(response.data.jwt) };
};

export const login = async (
  email: string,
  password: string
): Promise<JwtType> => {
  const response = await $host.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", response.data.jwt);

  return { ...jwtDecode(response.data.jwt) };
};

export const check = async (): Promise<JwtType | undefined> => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await $authHost.get("/auth");
    return { ...jwtDecode(response.data.jwt) };
  }
};
