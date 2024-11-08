import * as React from "react";
import {
  createRootRoute,
  Link,
  Outlet,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createContact, getContacts } from "../contacts";

export const Route = createRootRoute({
  component: RootComponent,
  loader: () => getContacts(),
});

export default function RootComponent() {
  const contacts = Route.useLoaderData();
  const router = useRouter();
  const { status } = useRouterState();

  return (
    <>
      <div id="sidebar">
        <h1>TanStack Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              const contact = await createContact();
              router.invalidate();
              router.navigate({
                to: "/contacts/$contactId",
                params: { contactId: contact.id },
              });
            }}
          >
            <button type="submit">New</button>
          </form>
        </div>

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link
                    to="/contacts/$contactId"
                    params={{ contactId: contact.id }}
                    activeProps={{
                      className: "active",
                    }}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={status === "pending" ? "loading" : ""}>
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
