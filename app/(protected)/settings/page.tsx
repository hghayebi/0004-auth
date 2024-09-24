import actions from "@/actions";
import { auth } from "@/auth";
import { Button } from "@nextui-org/react";
import React from "react";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      <div>SettingsPage</div>
      <div>{JSON.stringify(session, null, 2)}</div>
      <form action={actions.logout}>
        <Button variant="shadow" color="danger" type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
