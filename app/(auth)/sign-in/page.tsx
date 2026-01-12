import Image from "next/image";
import React from "react";
import loginImg from "../../../public/login.svg";
import SignInFormClient from "@/modules/auth/components/sign-in-form";

function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Image
        src={loginImg}
        alt="login"
        width={300}
        height={300}
        className="object-contain"
        priority
      />
      <SignInFormClient />
    </div>
  );
}

export default page;
