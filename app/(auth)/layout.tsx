import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 flex-col ">
      {children}
    </main>
  );
};

export default AuthLayout;
