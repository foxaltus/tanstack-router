import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <p id="zero-state">
      This is a demo for TanStack Router.
      <br />
      Check out{" "}
      <a href="https://tanstack.com/router">the docs at tanstack.com/router</a>.
      <br />
      And of course see{" "}
      <a href="https://reactrouter.com">
        the original tutorial at reactrouter.com
      </a>
      .
    </p>
  );
}
