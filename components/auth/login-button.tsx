import paths from "@/paths";
import { Button, ButtonProps } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface LoginButtonProps extends ButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
}

export default function LoginButton({
  children,
  mode = "redirect",
  ...rest
}: LoginButtonProps) {
  if (mode === "modal") return <span>TODO: Implement modal</span>;
  return (
    <Button as={Link} href={paths.login()} {...rest}>
      {children}
    </Button>
  );
}
