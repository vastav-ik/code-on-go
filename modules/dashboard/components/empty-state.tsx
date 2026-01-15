import React from "react";
import Image from "next/image";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 p-8 mt-12 opacity-60">
      <div className="p-6">
        <Image
          src="/text-logo.svg"
          alt="CodeOnGo Logo"
          width={500}
          height={125}
          className="dark:invert"
        />
      </div>
      <div className="max-w-md space-y-2">
        <p className="text-muted-foreground text-lg">
          Your personal playground for building and experimenting with code.
          Select a project from the sidebar or create a new one to get started.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
