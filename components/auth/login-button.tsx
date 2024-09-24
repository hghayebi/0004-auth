"use client";

import paths from "@/paths";
import { Button, ButtonProps } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

interface LoginButtonProps extends ButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
}

export default function LoginButton({
  children,
  mode = "redirect",
  ...rest
}: LoginButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  if (mode === "modal") return <span>TODO: Implement modal</span>;
  return (
    <Button
      isLoading={isClicked}
      as={Link}
      href={paths.login()}
      onClick={() => setIsClicked(true)}
      {...rest}
    >
      {children}
    </Button>
  );
}
