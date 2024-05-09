"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { check } from "@/http/user/userAPI";
import { makeAuth } from "@/lib/features/user/userSlice";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const user = useAppSelector(state => state.userReducer.user);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    check()
      .then((res) => {
        if (res) {
          dispatch(
            makeAuth({
              //@ts-ignore
              email: res.email,
              //@ts-ignore
              roles: res.roles,
              isAuth: true,
            })
          );
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (user.isAuth) {
    return redirect("/students");
  }

  if (!user.isAuth) {
    return redirect("/login");
  }
};

export default Page;
