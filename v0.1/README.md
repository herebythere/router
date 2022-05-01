# Router v0.1

## Abstraction

The store component of `Router` is represented by the browser's history API.

## About

Location is often represented as a URL. But this isn't required. `Router`
leverages a string as a semantic reference for location.

`Router` does not parse or encode data from a location. Instead, it broadcasts the minimal amount of state alongside a url for systems to react accordingly.

For example, necesssary data is sent alongside the updated url.
:
```TS
push({
    type: "router_broadcast",
    location: "mysite.com/posts/23",
    title: "routers got complex for some reason",
    data: { "post": 23 },
})
```

The result is a consice way to pass the data needed to represent location in a
system, while the location becomes a visual reference to help participants
recognize location.

On the web, location happens to be represented as a URL.

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
  type: "router_hash_change"
  location: string
  title: string
  data: unknown
}
````