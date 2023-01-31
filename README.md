# Router

A ridiculously concise SPA router.

Check out the [demo](https://herebythere.github.io/router/).

## Abstract

`Router` is a store that broadcasts location to concerned parts of an
application.

## About

Location is often represented as a URL. But this isn't required. `Router` could
leverage any type as the _location_.


## Usage

### Broadcast actions

```
<L, D>{
    location: L
    title: string
    data: D
}
```

### Broadcaster Interface

```
Broadcaster {
	postMessage(message) {
		...
	}
}

setBroadcaster()
```

### Dispatch actions

Push router entry:

```
push<L>({
    location: L,
    title: "routers got complex for some reason",
    data: { "post": 23 },
})
```

## License

BSD 3-Clause License

