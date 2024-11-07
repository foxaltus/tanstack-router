import * as React from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getContact } from "../contacts";

export const Route = createFileRoute("/contacts_/$contactId/edit")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const contact = await getContact(params.contactId);
    if (!contact) throw notFound();
    return contact;
  },
});

function RouteComponent() {
  const contact = Route.useLoaderData();

  return (
    <form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact?.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </form>
  );
}
