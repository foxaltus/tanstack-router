import * as React from "react";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Contact, deleteContact, getContact } from "../contacts";

export const Route = createFileRoute("/contacts/$contactId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const contact = await getContact(params.contactId);
    if (!contact) throw notFound();
    return contact;
  },
});

function RouteComponent() {
  const contact = Route.useLoaderData();
  const navigate = useNavigate();
  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <form
            action="edit"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "edit", from: Route.fullPath });
            }}
          >
            <button type="submit">Edit</button>
          </form>
          <form
            method="post"
            action="destroy"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!confirm("Please confirm you want to delete this record."))
                return;
              await deleteContact(contact.id);
              // @ts-expect-error hold on, we'll be adding the index route soon
              navigate({ to: "/" });
            }}
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: Contact }) {
  const favorite = contact.favorite;
  return (
    <form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </form>
  );
}
