import * as React from "react";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { Contact, deleteContact, getContact, updateContact } from "../contacts";

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
  const router = useRouter();
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
              router.navigate({ to: "edit", from: Route.fullPath });
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
              router.invalidate();
              router.navigate({ to: "/" });
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
  const router = useRouter();
  const favorite = contact.favorite;
  return (
    <form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (
          "submitter" in e.nativeEvent &&
          (e.nativeEvent.submitter as HTMLButtonElement | HTMLInputElement).name
        )
          formData.append(
            (e.nativeEvent.submitter as HTMLButtonElement | HTMLInputElement)
              .name,
            (e.nativeEvent.submitter as HTMLButtonElement | HTMLInputElement)
              .value
          );
        const favorite = formData.get("favorite") === "true";
        await updateContact(contact.id, { favorite });
        router.invalidate();
      }}
    >
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
