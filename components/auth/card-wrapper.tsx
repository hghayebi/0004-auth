import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";
import Header from "./header";
import BackButton from "./back-button";
import Social from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  social?: boolean;
}

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  social,
}: CardWrapperProps) {
  return (
    <Card className="w-full max-w-[400px] sm:w-[400px]">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      <CardBody>{children}</CardBody>
      {social ? (
        <CardFooter>
          <Social />
        </CardFooter>
      ) : null}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
}
