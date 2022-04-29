# Router v0.1

## Abstraction

The store component of `Router` is represented by the browser's history API.

## Implementation

The `index` property of the `store` cannot be guaranteed so it is ignored.
The browsers history index is arbitrary.

Browser history state and location can be loaded separately.

For instance, user visits site initially:
- user creates new history entries, travels to sub-path
- user refreshes, browser history remains for sub-path

User navigates to subpath immediately in browser:
- user loads sub-path in new session, there is no history entry
- signal to load state from some other resource

User can change a #hash in url in browser and it will navigate to that #hash
in the document.


```
{
  type: "router_broadcast_hash_change"
  location: string
  title: string
  data: unknown
}
```

```
interface PopMessage {
  type: "router_pop";
}
```