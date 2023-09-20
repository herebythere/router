# Router

`Router` is a store that broadcasts location data to an application.

Check out the [demo](https://herebythere.github.io/router/).

## Usage

### Broadcast actions

```
BroadcastAction<L, D> {
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
```

### Dispatch actions

Push router entry:

```
BroadcastAction {
    location: "articles/how-to-make-a-router",
    title: "routers got complex for some reason",
    data: { "post": 23 },
}

push<L>(BroadcastAction{
    location: L,
    title: "routers got complex for some reason",
    data: { "post": 23 },
})
```

## License

BSD 3-Clause License
