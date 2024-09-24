"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
// import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Social() {
  const [googleClicked, setGoogleClicked] = useState(false);
  const [githubClicked, setGithubClicked] = useState(false);

  const onClick = async (provider: "google" | "github") => {
    await signIn(provider);

    if (provider === "google") {
      setGoogleClicked(true);
    } else if (provider === "github") {
      setGithubClicked(true);
    }
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        fullWidth
        size="lg"
        variant="bordered"
        onClick={() => onClick("google")}
        isLoading={googleClicked}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        fullWidth
        size="lg"
        variant="bordered"
        onClick={() => onClick("github")}
        isLoading={githubClicked}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}
