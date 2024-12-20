/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ContactsContactIdImport } from './routes/contacts.$contactId'
import { Route as ContactsContactIdEditImport } from './routes/contacts_.$contactId.edit'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ContactsContactIdRoute = ContactsContactIdImport.update({
  id: '/contacts/$contactId',
  path: '/contacts/$contactId',
  getParentRoute: () => rootRoute,
} as any)

const ContactsContactIdEditRoute = ContactsContactIdEditImport.update({
  id: '/contacts_/$contactId/edit',
  path: '/contacts/$contactId/edit',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/contacts/$contactId': {
      id: '/contacts/$contactId'
      path: '/contacts/$contactId'
      fullPath: '/contacts/$contactId'
      preLoaderRoute: typeof ContactsContactIdImport
      parentRoute: typeof rootRoute
    }
    '/contacts_/$contactId/edit': {
      id: '/contacts_/$contactId/edit'
      path: '/contacts/$contactId/edit'
      fullPath: '/contacts/$contactId/edit'
      preLoaderRoute: typeof ContactsContactIdEditImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/contacts/$contactId': typeof ContactsContactIdRoute
  '/contacts/$contactId/edit': typeof ContactsContactIdEditRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/contacts/$contactId': typeof ContactsContactIdRoute
  '/contacts/$contactId/edit': typeof ContactsContactIdEditRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/contacts/$contactId': typeof ContactsContactIdRoute
  '/contacts_/$contactId/edit': typeof ContactsContactIdEditRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/contacts/$contactId' | '/contacts/$contactId/edit'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/contacts/$contactId' | '/contacts/$contactId/edit'
  id: '__root__' | '/' | '/contacts/$contactId' | '/contacts_/$contactId/edit'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ContactsContactIdRoute: typeof ContactsContactIdRoute
  ContactsContactIdEditRoute: typeof ContactsContactIdEditRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ContactsContactIdRoute: ContactsContactIdRoute,
  ContactsContactIdEditRoute: ContactsContactIdEditRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/contacts/$contactId",
        "/contacts_/$contactId/edit"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/contacts/$contactId": {
      "filePath": "contacts.$contactId.tsx"
    },
    "/contacts_/$contactId/edit": {
      "filePath": "contacts_.$contactId.edit.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
