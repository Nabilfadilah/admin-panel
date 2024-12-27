"use client";

import React, {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";

interface PropsType {
  children: ReactNode;
}

const AuthProvider = ({children}: PropsType) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
