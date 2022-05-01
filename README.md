# Router

A ridiculously concise SPA router.

Check out the [demo](https://herebythere.github.io/router/).

## Abstract

`Router` is a store that broadcasts location to concerned parts of an
application.

## About

Location is often represented as a URL. But this isn't required. `Router`
could leverage any type as the _location_.

```
router::push<L>({
    type: "router_broadcast",
    location: L,
    title: "routers got complex for some reason",
    data: { "post": 23 },
})
```

## Usage

### Dispatch actions

Push router entry:
```
<L>{
    type: "router_broadcast"
    location: L
    title: string
    data: unknown
}
```

Pop router entry (go back):
```
interface BackMessage {
  type: "router_back";
}
```

```
interface ForwardMessage {
  type: "router_forward";
}
```

### Broadcast actions

```
<L>{
    type: "router_broadcast"
    location: L
    title: string
    data: unknown
}
```
