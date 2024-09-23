import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import React from "react";

interface FormErrorProps {
  message: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-xl bg-danger-100 p-3 text-sm text-danger-500">
      <ExclamationTriangleIcon className="w-4" />
      <p>{message}</p>
    </div>
  );
}
