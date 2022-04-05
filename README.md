# Router

A ridiculously concise SPA router.

Check out the [demo](https://herebythere.github.io/router/).

## Abstract

`Router` is a store that broadcasts url changes to concerned parts of an application.


## About

Router does not parse or encode data from a url. Instead, it broadcasts the
minimal amount of state alongside a url for systems to react accordingly.

For instance:
```TS
router.dispatch({
    type: "PUSH",
    pathname: "mysite.com/posts/23",
    title: "routers got complex for some reason",
    data: {
      "hello": "world",  
      "img_url": "mysite.com/img/happy.jpeg",
    },
})
```

Instead of intuiting all required params from a url, necesssary data is
sent with the updated url.

The result is a consice way to pass the data needed to represent location in a
system. The url is a visual reference to help participants recognize location.