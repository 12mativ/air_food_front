"use client";

import LoaderIndicator from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { check } from "@/http/user/userAPI";
import { makeAuth } from "@/lib/features/user/userSlice";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    setIsLoading(true);
    check()
      .then((res) => {
        if (res) {
          dispatch(
            makeAuth({
              email: res.email!,
              roles: res.roles!,
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
    return redirect("/air-teach/students");
  }

  if (isLoading) {
    return <LoaderIndicator />;
  }

  return <>{children}</>;
}
