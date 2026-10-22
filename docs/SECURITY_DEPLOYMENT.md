# Firebase Realtime Database approval gate

The public `firebase-config.js` intentionally contains a Firebase Web API key; this is not a secret. The fixed GROUP_KEY is also public, so access MUST be enforced by server-side Database rules, not a hidden URL.

## Required Firebase Console steps (before merging/deploying this change)

1. Export a backup of the current Realtime Database including the marriage checklist.
2. In Authentication, enable the Google provider. Sign in on both family devices and collect the Firebase Auth UIDs securely.
3. In the Realtime Database data editor (Admin console, never client code), create `approvedMarriageUsers/<UID>=true` for exactly two approved users.
4. MERGE `docs/realtime-database-rules-fragment.json` under the existing top-level `rules` object. It is a fragment, NOT a whole-project rules file. Retain rules for all other apps in the shared Firebase project. Before enabling the strict subtree, make sure no permissive parent `.read`/`.write` grants broader access: Realtime Database parent allow rules override descendant denies.
5. Publish the rules and verify unauthenticated/unauthorized reads and writes are denied using Firebase Rules Playground; verify both authorized accounts can sync. Do not rely only on the client UI for security.
6. Deploy GitHub Pages after rules work; the client now displays an explicit Google login button and falls back to local-only checklist until authenticated.

CAUTION: if the old permissive project-level `rules` grants `.read: true` or `.write: true` at the root, these scoped rules CANNOT revoke that allowance. Tighten root rules carefully across all apps before claiming the data protected.
