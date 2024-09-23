import { CheckCircleIcon } from "@heroicons/react/16/solid";
import React from "react";

interface FormSuccessProps {
  message: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-xl bg-emerald-100 p-3 text-sm text-emerald-500">
      <CheckCircleIcon className="w-4" />
      <p>{message}</p>
    </div>
  );
}
