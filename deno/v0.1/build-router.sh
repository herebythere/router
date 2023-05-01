#!/bin/bash

curr_dir=`dirname $0`

router=$curr_dir/mod.ts
# router_test=$curr_dir/mod.test.ts

es_dir=$curr_dir/../../es/v0.1
es_router=$es_dir/router.js
# es_router_test=$es_dir/router-dom.test.js

# deno bundle $router $es_router
# deno bundle $router_test $es_router_test
