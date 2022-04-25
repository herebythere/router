# Router

A ridiculously concise SPA router.

Check out the [demo](https://herebythere.github.io/router/).

## Abstract

`Router` is a store that broadcasts location to concerned parts of an
application.

## About

Location is often represented as a URL. But this isn't required. `Router`
leverages a string as a semantic reference for location.

This could be any semantic reference, in this case a string.

`Router` does not parse or encode data from a location. Instead, it broadcasts the minimal amount of state alongside a url for systems to react accordingly.

For example, necesssary data is sent alongside the updated url.
:
```TS
router.dispatch({
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

## Usage

### Dispatch actions

Push router entry:
```
{
    type: "router_broadcast"
    location: string
    title: string
    data: unknown
}
```

Pop router entry (go back):
```
interface PopMessage {
  type: "router_pop";
}
```

### Broadcast actions

```
{
    type: "router_broadcast"
    location: string
    title: string
    data: unknown
}
```
```
{
  type: "router_broadcast_hash_change"
  location: string
  title: string
  data: unknown
}
```

